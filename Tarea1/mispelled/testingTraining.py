import re
from spellchecker import SpellChecker

spell = SpellChecker()

def mispelledCounter(line):
    x = re.split("[ \t\n,\.\"]", line)
    counter = 0
    #print("---> " + str(len(x)))
    for word in x:
        if(len(word) == 0):
            continue
        if(not re.match(".*[a-zA-Z].*",word)):
            continue
        if(spell.correction(word) != word):
            counter += 1 
    #print(counter)
    return counter


def splitData(data):
    lines = data.split('\n')
    #print(lines[4])
    linesArray = []
    for line in lines:
        linesArray.append(line.split(','))
    return linesArray


with open('data/Testing.csv', 'r',encoding='latin-1') as f:
    s1 = f.read()

lines = splitData(s1)
#x = mispelledCounter("this iz m1 testing   tnx")
f= open("countingMispelledTesting.csv","w+")
iterlines = iter(lines)
next(iterlines)
for line in iterlines:
    f.write("%d\n" % mispelledCounter(line[1]))
    #print(countUppercase(line[1]))
f.close()