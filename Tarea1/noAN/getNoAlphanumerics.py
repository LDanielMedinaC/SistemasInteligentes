import re
from spellchecker import SpellChecker

spell = SpellChecker()

def mispelledCounter(line):
    x = re.split("[^a-z0-9]", line)
    return len(x) - 1


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
#x = mispelledCounter("this iz m1 testing   tnx")
f= open("noAlphaNumericsTesting.csv","w+")
iterlines = iter(lines)
next(iterlines)
counter = 0
for line in iterlines:
    f.write("%d\n" % mispelledCounter(line[1]))
    print(counter)
    counter += 1
f.close()