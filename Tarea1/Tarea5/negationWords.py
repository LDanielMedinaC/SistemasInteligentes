import re

def negationWord(line):
    negation = ["n't", "dont", "didnt", "mustnt", "wont", "havent", "hadnt", "doesnt", "not", "wasnt", "werent"]
    
    counter = 0
    #print("---->" + str(len(x)))
    for word in negation:
        x = re.split("n\'t", line)
        counter += len(x) - 1
    print(counter)
    return counter


def splitData(data):
    lines = data.split('\n')
    #print(lines[4])
    linesArray = []
    for line in lines:
        linesArray.append(line.split(','))
    return linesArray



with open('../data/Testing.csv', 'r',encoding='latin-1') as f:
    s1 = f.read()

lines = splitData(s1)

f= open("countingNegationWordTesting.csv","w+")
iterlines = iter(lines)
next(iterlines)
for line in iterlines:
    f.write("%d\n" % negationWord(line[1]))
    
f.close()