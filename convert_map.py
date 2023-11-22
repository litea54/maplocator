import json
from pprint import pprint

with open('.\\src\\maps\\guildDungeon_old.json') as fp:
  old_map = json.load(fp)
# pprint(old_map)

empty_chars = set(['1', '9'])
mapping = {
    '9': 0,
    '1': 2,
    'T': 3,
    'C': 9,
}

new_map = []

class Cell(dict):
    def __init__(self, f: int=0, comment='') -> None:
        dict.__init__(self, f=f, comment=comment)

# print(json.dumps(Cell(2)))

for row in old_map:
    new_row = []
    # print(repr(row))
    for col in row:
        new_row.append(Cell(mapping.get(col, 0), comment=col if col not in empty_chars else ''))
    # print(repr(new_row))
    new_map.append(new_row)

with open('.\\src\\maps\\guildDungeon.json', 'w') as fp:
  json.dump(new_map, fp)