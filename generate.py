import uuid
import random
import time
import random
import jieba

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
    conversation_id = '23aebc01-7d14-4dfd-98fc-0b7a792e89c5'
    user_id = '22687f1e-4593-495d-a93b-ad1e3d640aeb'

    for i in range(num_records):
        message_id = generate_uuid()
        category = 'PLAIN_TEXT'
        content = generate_random_content(i)
        status = random.choice(['SENT', 'DELIVERED', 'READ'])
        created_at = int(time.time() * 1000)  # 以毫秒为单位的时间戳
        sql_values.append(sql_template.format(message_id, conversation_id, user_id, category, content, status, created_at))
        if (i+1) % 5000 == 0:
            print(f"{i+1} records generated")
    return '\n'.join(sql_values)

# 生成10条符合标准的UUID的消息记录的批量插入SQL语句并输出到本地文件
with open('insert.sql', 'w') as file:
    insert_sql = generate_insert_sql(140000)
    file.write(insert_sql)

print('生成insert.sql文件成功！')
