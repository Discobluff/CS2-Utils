# CS2-Utils
A web-based tool for CS2 which presents interactive maps and allow to save Youtube videos for utilities


## DB Postgres

docker run --name cs2-utils-postgres -e POSTGRES_PASSWORD=secret -e POSTGRES_DB=map -p 5432:5432 -d postgres
docker rm -f cs2-utils-postgres
sudo systemctl stop postgresql
docker exec -it cs2-utils-postgres psql -U postgres -W
\c map