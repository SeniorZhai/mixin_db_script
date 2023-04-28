# -*- coding: utf-8 -*-
import random

# 定义语料库的句子列表
corpus = [
    '我很幸运能够认识你。',
    '你是我生命中的阳光。',
    '别人送你花，我送你整个花园。',
    '你是我的小幸福。',
    '有你的世界才是完美的。',
    '你的微笑可以让我忘记所有烦恼。',
    '你是我早安和晚安的唯一。',
    '和你在一起我觉得很幸福。',
    '你是我的梦想和未来。',
    '和你在一起我觉得很安心。',
]

# 创建一个空的语料库文件
filename = 'corpus.txt'
with open(filename, 'w', encoding='utf-8') as f:
    pass

# 从语料库中随机选择句子，并将它们写入语料库文件
with open(filename, 'a', encoding='utf-8') as f:
    for i in range(1000):
        sentence = random.choice(corpus)
        f.write(sentence + '\n')

# 输出语料库文件的内容
with open(filename, 'r', encoding='utf-8') as f:
    print(f.read())
