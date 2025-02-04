import os
import psycopg2
import pandas as pd

#Database connection configurations
DB_CONFIG = {
    "dbname": "plutodb",
    "user": "taralee",
    "password": "user",
    "host": "db", #db host name in docker compose
    "port": 5432
}

#Getting all the csv files in the data folder
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
DATA_FILES = [
    os.path.join(DATA_DIR, "games.csv"),
    os.path.join(DATA_DIR, "simulations.csv"),
    os.path.join(DATA_DIR, "venues.csv")
]

print("Connecting to database with config:", DB_CONFIG)

#Read data from each CSV file and build tables from them
def load_csv_to_db(file_path, table_name):
    df = pd.read_csv(file_path)
    conn = psycopg2.connect(**DB_CONFIG)
    cursor = conn.cursor()

    columns = ", ".join([f"{col} TEXT" for col in df.columns])
    cursor.execute(f"CREATE TABLE IF NOT EXISTS {table_name} ({columns});")

    for _, row in df.iterrows():
        placeholders = ", ".join(["%s"] * len(row))
        cursor.execute(
            f"INSERT INTO {table_name} VALUES ({placeholders}) ON CONFLICT DO NOTHING;",
            tuple(row)
        )

    conn.commit()
    cursor.close()
    conn.close()

def main():
    for file_path in DATA_FILES:
        table_name = file_path.split("/")[-1].replace(".csv", "")
        load_csv_to_db(file_path, table_name)
        print(f"Loaded {file_path} into {table_name}")

if __name__ == "__main__":
    main()
