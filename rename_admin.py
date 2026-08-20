import os

replacements = [
    ('"/admin', '"/digiadmin'),
    ("'/admin", "'/digiadmin"),
    ('`/admin', '`/digiadmin')
]

count = 0
for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith(('.ts', '.tsx', '.js', '.jsx')):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = content
            for old, new in replacements:
                new_content = new_content.replace(old, new)
                
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                count += 1
                print(f'Updated {filepath}')

print(f'Total files updated: {count}')
