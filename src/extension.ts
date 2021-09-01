import * as vscode from 'vscode';

import { buildSync } from 'esbuild';
import fileSize from 'filesize';
import gzip from 'gzip-size';

export function activate (context: vscode.ExtensionContext)
{
	let disposable1 = vscode.commands.registerCommand('phaser4examples.create', () =>
    {
        const ed = vscode.window.activeTextEditor;

        let path = '../../../../../phaser-genesis/srcx';

        if (ed)
        {
            const folders = ed.document.fileName.split('\\');

            const where = folders.indexOf('src');

            path = '../'.repeat((folders.length - where) + 1) + 'phaser-genesis/src';
        }

        const content = `//  Phaser 4 Example

        import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '${path}/config';

import { AddChild } from '${path}/display/';
import { Game } from '${path}/Game';
import { LoadImageFile } from '${path}/loader/files/LoadImageFile';
import { Loader } from '${path}/loader/Loader';
import { Scene } from '${path}/scenes/Scene';
import { Sprite } from '${path}/gameobjects/';
import { StaticWorld } from '${path}/world/StaticWorld';

class Demo extends Scene
{
    constructor ()
    {
        super();

        this.create();
    }

    async create ()
    {
        await LoadImageFile('logo', 'assets/logo.png');

        const world = new StaticWorld(this);

        const logo = new Sprite(400, 300, 'logo');

        AddChild(world, logo);
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
`;

        vscode.workspace.openTextDocument({ language: 'typescript', content });

    });

	context.subscriptions.push(disposable1);

    let disposable2 = vscode.commands.registerCommand('phaser4examples.build', () =>
    {
        const ed = vscode.window.activeTextEditor;

        if (ed)
        {
            // d:\wamp\www\dev\examples\src\test\renderdraw.ts
            // /Users/rich/Documents/GitHub/dev/examples/src/test/renderdraw.ts

            const fullPath = ed.document.fileName;

            const windows = 'd:\\wamp\\www\\dev\\examples\\src';
            const mac = '/Users/rich/Documents/GitHub/dev/examples/src';

            const isPC = fullPath.startsWith(windows);
            const isMac = fullPath.startsWith(mac);

            if (isPC || isMac)
            {
                const windowsLive = 'd:\\wamp\\www\\dev\\examples\\live';
                const macLive = '/Users/rich/Documents/GitHub/dev/examples/live';
    
                const srcPath = (isPC) ? windows : mac;
                const livePath = (isPC) ? windowsLive : macLive;

                const outfile = fullPath.replace(srcPath, livePath).replace('.ts', '.js');
                const outfilemin = fullPath.replace(srcPath, livePath).replace('.ts', '.min.js');
                const fileName = (isPC) ? fullPath.replace(`${windows}\\`, '') : fullPath.replace(`${mac}/`, '');

                const buildResults = buildSync({
                    entryPoints: [ fullPath ],
                    outfile,
                    target: 'esnext',
                    sourcemap: true,
                    minify: false,
                    bundle: true,
                    metafile: true,
                    logLevel: 'silent'
                });
                
                if (buildResults.errors.length > 0)
                {
                    vscode.window.showInformationMessage(`esbuild error ${buildResults.errors}`);
                }
                else
                {
                    const exampleFile = fileName.replace('.ts', '.js').replace('\\', '/');

                    const exampleURL = (isPC) ? `http://192.168.0.100/dev/examples/live/debug.html?f=${exampleFile}` : `https://phaser4.test.local:8890/debug.html?f=${exampleFile}`;

                    vscode.env.clipboard.writeText(exampleURL);

                    vscode.window.showInformationMessage(`Built Phaser 4 Example: ${fileName}`, 'Metafile', 'Stats', 'Open').then(item =>
                    {
                        if (item === 'Metafile')
                        {
                            vscode.workspace.openTextDocument({ language: 'text', content: JSON.stringify(buildResults.metafile, null, 2) });
                        }
                        else if (item === 'Open')
                        {
                            vscode.env.openExternal(vscode.Uri.parse(exampleURL));
                        }
                        else if (item === 'Stats')
                        {
                            buildSync({
                                entryPoints: [ fullPath ],
                                outfile: outfilemin,
                                target: 'esnext',
                                sourcemap: false,
                                minify: true,
                                bundle: true,
                                metafile: false,
                                logLevel: 'silent'
                            });

                            Promise.all([
                                vscode.workspace.fs.stat(vscode.Uri.file(outfile)),
                                vscode.workspace.fs.stat(vscode.Uri.file(outfilemin)),
                                vscode.workspace.fs.readFile(vscode.Uri.file(outfilemin))
                            ]).then(values =>
                            {
                                const unminSize = fileSize(values[0].size);
                                const minSize = fileSize(values[1].size);
                                const gzSize = fileSize(gzip.sync(Buffer.from(values[2])));

                                vscode.window.showInformationMessage(`Bundle: ${unminSize} - Min: ${minSize} - Gzip: ${gzSize}`);

                            }).catch(error =>
                            {
                                console.error('arsebags', error);
                            });
                        }
                    });
                }
            }
            else
            {
                vscode.window.showErrorMessage('Not a Phaser 4 Example');
            }
        }

    });

	context.subscriptions.push(disposable2);

    let disposable3 = vscode.commands.registerCommand('phaser4examples.compile', () =>
    {
        const ed = vscode.window.activeTextEditor;

        if (ed)
        {
            const fullPath = ed.document.fileName;

            const windows = 'd:\\wamp\\www\\dev\\examples\\src';
            const mac = '/Users/rich/Documents/GitHub/dev/examples/src';

            const isPC = fullPath.startsWith(windows);
            const isMac = fullPath.startsWith(mac);

            if (isPC || isMac)
            {
                const windowsLive = 'examples\\src';
                const macLive = 'examples/src';
    
                const srcPath = (isPC) ? windows : mac;
                const livePath = (isPC) ? windowsLive : macLive;

                const srcFile = fullPath.replace(srcPath, livePath);

                const fileName = (isPC) ? fullPath.replace(`${windows}\\`, '') : fullPath.replace(`${mac}/`, '');

                const terminal = vscode.window.createTerminal(`Phaser 4 Example ${fileName}`);

                // (<any>vscode.window).onDidWriteTerminalData((e: any) => {
                //     vscode.window.showInformationMessage(`onDidWriteTerminalData listener attached, check the devtools console to see events`);
                //     console.log('onDidWriteData', e);
                // });

                terminal.sendText(`node dev.mjs --src "${srcFile}"`);
            }
            else
            {
                vscode.window.showErrorMessage('Not a Phaser 4 Example');
            }
        }

    });

	context.subscriptions.push(disposable3);
}

export function deactivate() {}
