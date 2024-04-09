/* eslint no-underscore-dangle: 0 */
/*
Уявіть, що ви створюєте додаток мультимедійного плеєра, який може відтворювати різні типи медіа,  такі як аудіо та відео.

Ваше завдання - реалізувати фасад для мультимедійного плеєра, щоб спростити взаємодію з ним для кінцевого користувача.
*/
type MediaType = AudioFile | VideoFile;

interface IMedia {
    addMedia(media: MediaType): void;
    removeMedia(name: string): void;
}
enum AudioType {
    MP3 = 'MP3',
    DVD_AUDIO = 'DVD_AUDIO',
}
enum VideoType {
    MP4 = 'MP4',
    AVI = 'AVI',
    MKV = 'MKV',
}
abstract class FileType {
    constructor(
        private readonly _name: string,
        private readonly _author: string,
        private readonly format: AudioType | VideoType,
    ) {}
    get name(): string {
        return this._name;
    }
    get author(): string {
        return this._author;
    }
}
class AudioFile extends FileType {}
class VideoFile extends FileType {}
class Media implements IMedia {
    private mediaFiles: MediaType[] = [];
    addMedia(media: MediaType): void {
        this.mediaFiles = [...this.mediaFiles, media];
    }
    removeMedia(name: string): void {
        this.mediaFiles = this.mediaFiles.filter(media => media.name !== name);
    }
    findMedia(name: string): MediaType | undefined {
        return this.mediaFiles.find(media => media.name.toLowerCase() === name.toLowerCase());
    }
    getFiles(): MediaType[] {
        return this.mediaFiles;
    }
}
interface IPlayer {
    play(name: string): void;
    stop(): void;
    remove(name: string): void;
    prev(): void;
    next(): void;
    addAudio(name: string): void;
    addVideo(name: string): void;
}
class Player implements IPlayer {
    private readonly media: Media;
    private currentMedia!: string;
    constructor() {
        this.media = new Media();
    }
    play(name: string): void {
        let media = this.media.findMedia(name);
        media ? console.log(`Playing ${name}`) : console.log('This media was not found ');
        media ? (this.currentMedia = name) : '';
    }
    stop(): void {
        this.currentMedia !== undefined ? console.log('Stopped') : '';
    }
    addAudio(name: string): void {
        this.media.addMedia(new AudioFile(name, '', AudioType.MP3));
    }
    addVideo(name: string): void {
        this.media.addMedia(new VideoFile(name, '', VideoType.MKV));
    }
    remove(name: string): void {
        this.media.removeMedia(name);
    }
    next(): void {
        if (this.currentMedia !== undefined) {
            const indexOfCurrent = this.media
                .getFiles()
                .findIndex(obj => obj.name.toLowerCase() === this.currentMedia.toLowerCase());
            let mediaLength = this.media.getFiles().length;
            if (mediaLength - 1 > indexOfCurrent) {
                let nextMedia = this.media.getFiles()[indexOfCurrent + 1];
                this.play(nextMedia.name);
            } else {
                console.log('Last one is already playing');
            }
        }
    }
    prev(): void {
        if (this.currentMedia !== undefined) {
            const indexOfCurrent = this.media
                .getFiles()
                .findIndex(obj => obj.name.toLowerCase() === this.currentMedia.toLowerCase());
            if (indexOfCurrent !== 0) {
                let prevMedia = this.media.getFiles()[indexOfCurrent - 1];
                this.play(prevMedia.name);
            } else {
                console.log('First one is already playing');
            }
        }
    }
}

export const player = new Player();
// player.addAudio('Wind of Change');
// player.addAudio('Not Afraid');
// player.addVideo('something');
// player.play('Not Afraid');
// player.stop();
