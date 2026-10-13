"""Build a portable ZIP with sources and licenses, excluding user ROMs and test outputs."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED

root = Path(__file__).resolve().parent.parent
paths = ['README.md', 'Abrir-Investigator.cmd', 'package.json', 'THIRD_PARTY.md',
         'src', 'portable', 'profiles', 'third_party', 'tools', 'tests', 'docs', '.github']
target = root / 'SNES-ROM-Investigator-0.1.0.zip'
with ZipFile(target, 'w', ZIP_DEFLATED) as archive:
    for entry in paths:
        base = root / entry
        files = [base] if base.is_file() else sorted(base.rglob('*'))
        for file in files:
            if file.is_file() and '__pycache__' not in file.parts:
                archive.write(file, 'SNES-ROM-Investigator/' + file.relative_to(root).as_posix())
print(target)
