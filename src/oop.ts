interface INote {
    noteDidUpdate(): void;
    noteIsCompleted(): void;
    updateAbout(about: string[]): void;
}
abstract class ExampleOfNote implements INote {
    readonly id: number;
    isCompleted: boolean;
    private readonly createdAt: number;
    updatedAt: number | null;
    constructor(readonly name: string, protected about: string[]) {
        this.id = Math.round(Math.random() * 100);
        this.isCompleted = false;
        this.createdAt = Date.now();
        this.updatedAt = null;
    }
    noteDidUpdate(): void {
        this.updatedAt = Date.now();
    }
    noteIsCompleted(): void {
        this.isCompleted = true;
    }
    updateAbout(about: string[]): void {
        this.about = [...about];
    }
}
export class BasicNote extends ExampleOfNote {
    constructor(name: string, about: string[]) {
        super(name, about);
    }
}
export class AdvancedNote extends ExampleOfNote {
    constructor(name: string, about: string[]) {
        super(name, about);
    }
}

export class NoteList {
    private notes: (BasicNote | AdvancedNote)[] = [];

    addNewNote(note: BasicNote | AdvancedNote): void {
        this.notes.push(note);
    }
    removeSomeNote(id: number): void {
        this.notes = this.notes.filter(note => note.id !== id);
    }
    updateNote(id: number, about: string[]): void {
        this.notes.filter(note => {
            if (note.id === id && note instanceof BasicNote) {
                return { ...note, about: note.updateAbout(about), updatedAt: note.noteDidUpdate() };
            } else if (note.id === id && note instanceof AdvancedNote) {
                const answer = confirm('Are you really want to update this note?');
                if (answer) {
                    return { ...note, about: note.updateAbout(about), updatedAt: note.noteDidUpdate() };
                }
                return note;
            }
            return note;
        });
    }
    // searchNotes(query: string): (BasicNote | AdvancedNote)[] {
    //     return this.notes.filter(note => note.name.includes(query) || note.about.includes(query));
    // }
    // sortNotesByStatus(): void {
    //     this.notes.sort((a, b) => a.isCompleted - b.isCompleted);
    // }

    // sortNotesByCreatedAt(): void {
    //     this.notes.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    // }
    // getFullInfo(name: string): BasicNote | AdvancedNote | undefined;
    // getFullInfo(id: number): BasicNote | AdvancedNote | undefined;
    // getFullInfo(about: string[]): BasicNote | AdvancedNote | undefined;
    // getFullInfo(query: string | number | string[]) {
    //     if (typeof query === 'number') {
    //         const id = query;
    //         const someNote = this.notes.find(note => note.id === id);
    //         if (!someNote) {
    //             throw new Error('There is no any note with that id');
    //         }
    //         return someNote;
    //     } else if (typeof query === 'string') {
    //         const name = query;
    //         const someNote = this.notes.find(note => note.name === name);
    //         if (!someNote) {
    //             throw new Error('There is no any note with that id');
    //         }
    //         return someNote;
    //     }else{
    //         return this.notes.filter(note => {
    //             return query.every(item => note.)
    //         })
    //     }
    // }
    getAllNotes(): void {
        console.log(this.notes);
    }
    getInfoAboutNotes(): string {
        let toBeCompleted = 0;
        this.notes.forEach(note => (note.isCompleted === false ? toBeCompleted++ : note));
        let result =
            this.notes.length > 1
                ? `There are ${this.notes.length} notes , and ${toBeCompleted} notes is not completed yet`
                : `There is ${this.notes.length} note , and ${toBeCompleted} note is not completed yet`;
        return result;
    }
    isCompleted(id: number): void {
        this.notes = this.notes.filter(note => {
            if (note.id === id) {
                return { ...note, isCompleted: note.noteIsCompleted() };
            }
            return note;
        });
    }
}
/* eslint no-underscore-dangle: 0 */
export class Note {
    private _title: string;
    private _content: string;
    private _editedDate: Date | null;
    private _status: 'default' | 'confirmationRequired' | 'completed';
    private readonly _createdDate: Date;
    private readonly _id: number;
    constructor(title: string, content: string, status: 'default' | 'confirmationRequired' | 'completed') {
        this._title = title;
        this._id = Math.round(Math.random()) * 100;
        this._content = content;
        this._createdDate = new Date();
        this._editedDate = null;
        this._status = status;
    }
    get id(): number {
        return this._id;
    }
    get title(): string {
        return this._title;
    }

    get content(): string {
        return this._content;
    }

    get createdDate(): Date {
        return this._createdDate;
    }

    get editedDate(): Date | null {
        return this._editedDate;
    }

    get status(): 'default' | 'confirmationRequired' | 'completed' {
        return this._status;
    }

    setStatus(status: 'default' | 'confirmationRequired' | 'completed'): void {
        this._status = status;
        this._editedDate = new Date();
    }

    updateContent(content: string): void {
        this._content = content;
        this._editedDate = new Date();
    }
}

export class TodoList {
    private notes: Note[] = [];

    addNote(note: Note): void {
        this.notes.push(note);
    }

    deleteNoteById(id: number): void {
        this.notes = this.notes.filter(note => note.id !== id);
    }

    getNoteById(id: number): Note | undefined {
        return this.notes.find(note => note.id === id);
    }

    getAllNotes(): Note[] {
        return this.notes;
    }

    editNoteContent(id: number, content: string): void {
        const note = this.getNoteById(id);
        if (note) {
            note.updateContent(content);
        }
    }

    setNoteStatus(id: number, status: 'default' | 'confirmationRequired' | 'completed'): void {
        const note = this.getNoteById(id);
        if (note) {
            note.setStatus(status);
        }
    }
    searchNotes(keyword: string): Note[] {
        const lowerCaseKeyword = keyword.toLowerCase();
        return this.notes.filter(
            note =>
                note.title.toLowerCase().includes(lowerCaseKeyword) ||
                note.content.toLowerCase().includes(lowerCaseKeyword),
        );
    }

    // Сортування нотаток за статусом
    sortNotesByStatus(): void {
        this.notes.sort((a, b) => a.status.localeCompare(b.status));
    }

    // Сортування нотаток за часом створення
    sortNotesByCreatedDate(): void {
        this.notes.sort((a, b) => a.createdDate.getTime() - b.createdDate.getTime());
    }
}
