"""Optional local CLI adapter. Does not download tools or produce a validated port."""
from __future__ import annotations
import argparse
import json
from pathlib import Path
import subprocess
import sys


def command(args: argparse.Namespace) -> list[str]:
    cli = Path(args.cli).expanduser().resolve()
    rom = Path(args.rom).expanduser().resolve()
    if not cli.is_file():
        raise ValueError('SNESRecomp CLI não encontrado.')
    if not rom.is_file():
        raise ValueError('ROM não encontrada.')
    if cli.suffix.lower() not in ('.py', '.exe', ''):
        raise ValueError('Use o script .py ou o executável SNESRecomp.')
    out = [sys.executable, str(cli)] if cli.suffix.lower() == '.py' else [str(cli)]
    out += [args.mode, '--rom', str(rom)]
    if args.mode == 'build':
        if not args.output:
            raise ValueError('build exige --output para um projeto novo.')
        target = Path(args.output).expanduser().resolve()
        if target.exists() and any(target.iterdir()):
            raise ValueError('Escolha uma pasta de saída inexistente ou vazia.')
        out += ['--output', str(target)]
    if args.mode == 'verify-rom':
        if not args.sha256:
            raise ValueError('verify-rom exige --sha256 da base esperada.')
        if len(args.sha256) != 64 or any(c not in '0123456789abcdefABCDEF' for c in args.sha256):
            raise ValueError('SHA-256 inválido.')
        out += ['--expected-sha256', args.sha256, '--json-progress']
    return out


def main() -> int:
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--cli', required=True, help='Caminho do snesrecomp.exe ou snesrecomp_cli.py')
    p.add_argument('--rom', required=True)
    p.add_argument('--mode', choices=['build', 'verify-rom'], default='build')
    p.add_argument('--output')
    p.add_argument('--sha256')
    p.add_argument('--dry-run', action='store_true', help='Mostrar argumentos sem executar')
    args = p.parse_args()
    try:
        cmd = command(args)
        if args.dry_run:
            print(json.dumps(cmd, ensure_ascii=False, indent=2))
            return 0
        print('Executando ferramenta local, sem shell. Gere e teste a integração do título separadamente.', flush=True)
        return subprocess.run(cmd, check=False).returncode
    except (ValueError, OSError) as exc:
        print(str(exc), file=sys.stderr)
        return 2


if __name__ == '__main__':
    raise SystemExit(main())
