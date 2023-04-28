import uuid
import random
import time
import random
import jieba
import os
import glob
import multiprocessing

# 生成符合标准的UUID
def generate_uuid():
    return str(uuid.uuid4())

# 生成随机的消息内容
def generate_random_content(index):
    # 读取语料库
    with open('corpus.txt', 'r', encoding='utf-8') as file:
        corpus = file.read()

    # 分词
    tokens = list(jieba.cut(corpus))

    # 生成句子
    sentence = []
    for i in range(random.randint(5, 10)):
        word = random.choice(tokens)
        sentence.append(word)

    # 拼接成字符串返回
    return ''.join(sentence)

# 生成批量插入的SQL语句
def generate_insert_sql(num_records):
    sql_template = "INSERT INTO messages (message_id, conversation_id, user_id, category, content, status, created_at) VALUES ('{}', '{}', '{}', '{}', '{}', '{}', {});"
    sql_values = []
    uuid_list = ["4e0e6e6b-6c9d-4e99-b7f1-1356322abec3",
             "639ec50a-d4f1-4135-8624-3c71189dcdcc"]

# 随机选择一个 UUID
    conversation_id = '23aebc01-7d14-4dfd-98fc-0b7a792e89c5'

    for i in range(num_records):
        message_id = generate_uuid()
        category = 'PLAIN_TEXT'
        user_id = random.choice(uuid_list)
        content = generate_random_content(i)
        status = random.choice(['SENT', 'DELIVERED', 'READ'])
        created_at = int(time.time() * 1000)  # 以毫秒为单位的时间戳
        sql_values.append(sql_template.format(message_id, conversation_id, user_id, category, content, status, created_at))
    return '\n'.join(sql_values)

num_processes = 10
num_records_per_process = 10000

def generate_and_write(num_records, file_name):
    with open(file_name, 'w') as file:
        insert_sql = generate_insert_sql(num_records)
        file.write(insert_sql)
    print(f"Generated {num_records} records and wrote to {file_name}")

if __name__ == '__main__':
    pool = multiprocessing.Pool(num_processes)
    for i in range(num_processes):
        file_name = f"insert_{i}.sql"
        pool.apply_async(generate_and_write, args=(num_records_per_process, file_name))
    pool.close()
    pool.join()

    # Merge files
    with open('insert.sql', 'w') as outfile:
        for filename in glob.glob('insert_*.sql'):
            with open(filename) as infile:
                outfile.write(infile.read())

    # Delete intermediate files
    for filename in glob.glob('insert_*.sql'):
        os.remove(filename)