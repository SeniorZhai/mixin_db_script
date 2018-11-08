```bash
./generate.sh count [conversation_id] [user_id] [file name]
./pull-db.sh
./check-db.sh
sqlite3 mixin.db < **.sql
./check-db.sh
./push-db.sh
```