"""
API для управления товарами магазина NOVA.
Поддерживает: получение списка, получение одного товара, создание, обновление, удаление.
"""
import json
import os
import psycopg2
import psycopg2.extras

SCHEMA = "t_p84866830_online_shop_developm"

CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-User-Id, X-Auth-Token",
    "Content-Type": "application/json",
}


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def row_to_dict(row):
    return {
        "id": row["id"],
        "name": row["name"],
        "price": row["price"],
        "old_price": row["old_price"],
        "category": row["category"],
        "tag": row["tag"],
        "rating": float(row["rating"]),
        "reviews_count": row["reviews_count"],
        "image_url": row["image_url"],
        "description": row["description"],
        "in_stock": row["in_stock"],
        "created_at": row["created_at"].isoformat() if row["created_at"] else None,
    }


def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS_HEADERS, "body": ""}

    method = event.get("httpMethod", "GET")
    params = event.get("queryStringParameters") or {}
    product_id = params.get("id")
    body_raw = event.get("body") or "{}"
    try:
        body = json.loads(body_raw)
    except Exception:
        body = {}

    conn = get_conn()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    try:
        # GET /products — список всех товаров (с фильтрацией)
        if method == "GET" and not product_id:
            category = params.get("category")
            search = params.get("search")
            conditions = []
            values = []
            if category and category != "Все":
                conditions.append("category = %s")
                values.append(category)
            if search:
                conditions.append("name ILIKE %s")
                values.append(f"%{search}%")
            where = f"WHERE {' AND '.join(conditions)}" if conditions else ""
            cur.execute(
                f"SELECT * FROM {SCHEMA}.products {where} ORDER BY created_at DESC",
                values
            )
            rows = cur.fetchall()
            return {
                "statusCode": 200,
                "headers": CORS_HEADERS,
                "body": json.dumps({"products": [row_to_dict(r) for r in rows]}, ensure_ascii=False),
            }

        # GET /products?id=X — один товар
        if method == "GET" and product_id:
            cur.execute(f"SELECT * FROM {SCHEMA}.products WHERE id = %s", (product_id,))
            row = cur.fetchone()
            if not row:
                return {"statusCode": 404, "headers": CORS_HEADERS, "body": json.dumps({"error": "Not found"})}
            return {
                "statusCode": 200,
                "headers": CORS_HEADERS,
                "body": json.dumps(row_to_dict(row), ensure_ascii=False),
            }

        # POST /products — создать товар
        if method == "POST":
            name = body.get("name", "").strip()
            price = body.get("price")
            category = body.get("category", "Другое")
            if not name or not price:
                return {"statusCode": 400, "headers": CORS_HEADERS, "body": json.dumps({"error": "name and price required"})}
            cur.execute(
                f"""INSERT INTO {SCHEMA}.products
                    (name, price, old_price, category, tag, rating, reviews_count, image_url, description, in_stock)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING *""",
                (
                    name, int(price),
                    int(body["old_price"]) if body.get("old_price") else None,
                    category,
                    body.get("tag") or None,
                    float(body.get("rating", 5.0)),
                    int(body.get("reviews_count", 0)),
                    body.get("image_url") or None,
                    body.get("description") or None,
                    bool(body.get("in_stock", True)),
                )
            )
            conn.commit()
            new_row = cur.fetchone()
            return {
                "statusCode": 201,
                "headers": CORS_HEADERS,
                "body": json.dumps(row_to_dict(new_row), ensure_ascii=False),
            }

        # PUT /products?id=X — обновить товар
        if method == "PUT" and product_id:
            fields = []
            values = []
            allowed = ["name", "price", "old_price", "category", "tag", "rating",
                       "reviews_count", "image_url", "description", "in_stock"]
            for key in allowed:
                if key in body:
                    fields.append(f"{key} = %s")
                    val = body[key]
                    if key == "price": val = int(val)
                    elif key == "old_price": val = int(val) if val else None
                    elif key == "rating": val = float(val)
                    elif key == "reviews_count": val = int(val)
                    elif key == "in_stock": val = bool(val)
                    values.append(val)
            if not fields:
                return {"statusCode": 400, "headers": CORS_HEADERS, "body": json.dumps({"error": "no fields to update"})}
            fields.append("updated_at = NOW()")
            values.append(product_id)
            cur.execute(
                f"UPDATE {SCHEMA}.products SET {', '.join(fields)} WHERE id = %s RETURNING *",
                values
            )
            conn.commit()
            row = cur.fetchone()
            if not row:
                return {"statusCode": 404, "headers": CORS_HEADERS, "body": json.dumps({"error": "Not found"})}
            return {
                "statusCode": 200,
                "headers": CORS_HEADERS,
                "body": json.dumps(row_to_dict(row), ensure_ascii=False),
            }

        # DELETE /products?id=X — удалить товар
        if method == "DELETE" and product_id:
            cur.execute(f"DELETE FROM {SCHEMA}.products WHERE id = %s RETURNING id", (product_id,))
            conn.commit()
            deleted = cur.fetchone()
            if not deleted:
                return {"statusCode": 404, "headers": CORS_HEADERS, "body": json.dumps({"error": "Not found"})}
            return {
                "statusCode": 200,
                "headers": CORS_HEADERS,
                "body": json.dumps({"deleted": True, "id": deleted["id"]}),
            }

        return {"statusCode": 405, "headers": CORS_HEADERS, "body": json.dumps({"error": "Method not allowed"})}

    finally:
        cur.close()
        conn.close()
