// Ви маєте JS код, який необхідно розширити анотацією примітивів,
// масивів, об'єктів (за необхідності),
// подумати над використанням перерахувань,
// а також реалізувати описані у вигляді коментарів властивості та методи.
// Крім цього є завдання з *, яке не є обов'язковим, але може вас зацікавити.

/* eslint no-underscore-dangle: 0 */
type Lecturer = {
    name: string;
    surname: string;
    position: string;
    company: string;
    experience: string;
    courses: string;
    contacts: string;
};
export class School {
    // implement 'add area', 'remove area', 'add lecturer', and 'remove lecturer' methods
    _areas: string[] = [];
    _lecturers: Lecturer[] = []; // Name, surname, position, company, experience, courses, contacts

    get areas(): string[] {
        return this._areas;
    }

    get lecturers(): Lecturer[] {
        return this._lecturers;
    }
    addArea(area: string): void {
        this._areas = [...this._areas, area.toLowerCase()];
    }
    removeArea(area: string): void {
        if (this._areas.includes(area.toLowerCase())) {
            this._areas = this._areas.filter(item => item !== area.toLowerCase());
        }
    }
    addLecturer(lecturer: Lecturer): void {
        this._lecturers = [...this._lecturers, lecturer];
    }
    removeLecturer(name: string): void {
        const lecturer = this._lecturers.find(item => item.name.toLowerCase() === name.toLowerCase());
        if (lecturer) {
            this._lecturers = this._lecturers.filter(person => person.name !== lecturer.name);
        }
    }
}

export class Area {
    // implement getters for fields and 'add/remove level' methods
    _levels: string[] = [];
    _name: string;

    constructor(name: string) {
        this._name = name;
    }
    get name(): string {
        return this._name;
    }
    get levels(): string[] {
        return this._levels;
    }
    addLevel(level: string): void {
        this._levels = [...this._levels, level.toLowerCase()];
    }
    removeLevel(level: string): void {
        if (this._levels.includes(level.toLowerCase())) {
            this._levels = this._levels.filter(item => item !== level.toLowerCase());
        }
    }
}

export class Level {
    // implement getters for fields and 'add/remove group' methods

    _groups: string[] = [];
    _name: string;
    _description: string;

    constructor(name: string, description: string) {
        this._name = name;
        this._description = description;
    }
    get name(): string {
        return this._name;
    }
    get description(): string {
        return this._description;
    }
    get groups(): string[] {
        return this._groups;
    }
    addGroup(group: string): void {
        this._groups = [...this._groups, group.toLowerCase()];
    }
    removeGroup(group: string): void {
        if (this._groups.includes(group.toLowerCase())) {
            this._groups = this._groups.filter(item => item !== group.toLowerCase());
        }
    }
}

export class Group {
    // implement getters for fields and 'add/remove student' and 'set status' methods

    _area: string;
    _status: boolean;
    _students: Array<string> = []; // Modify the array so that it has a valid toSorted method*
    directionName: string;
    levelName: string;

    constructor(directionName: string, levelName: string) {
        this.directionName = directionName;
        this.levelName = levelName;
        this._area = '';
        this._status = false;
    }
    get area(): string {
        return this._area;
    }
    set area(area) {
        this._area = area;
    }
    get status(): boolean {
        return this._status;
    }
    set status(status) {
        this._status = status;
    }
    get studens(): string[] {
        return this._students;
    }
    addStudent(student: string): void {
        this._students = [...this._students, student.toLowerCase()];
    }
    removeStudent(student: string): void {
        if (this._students.includes(student.toLowerCase())) {
            this._students = this._students.filter(item => item !== student.toLowerCase());
        }
    }
    // getPerformanceRating throws an error , toSorted works well
    // showPerformance() {
    //     const sortedStudents = this._students.toSorted((a, b) => b.getPerformanceRating() - a.getPerformanceRating());
    //     return sortedStudents;
    // }
}
type Grades = {
    [workName: string]: number;
};
type Visits = {
    [lesson: string]: boolean;
};
export class Student {
    // implement 'set grade' and 'set visit' methods

    _firstName;
    _lastName;
    _birthYear;
    _grades: Grades = { javaScript: 5, typeScript: 4 }; // workName: mark
    _visits: Visits = { javaScript: true, typeScript: true, cPlusClus: false }; // lesson: present

    constructor(firstName: string, lastName: string, birthYear: number) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._birthYear = birthYear;
    }
    set grade(grade: Grades) {
        this._grades = { ...this._grades, ...grade };
    }
    set visit(visit: Visits) {
        this._visits = { ...this._visits, ...visit };
    }
    get fullName() {
        return `${this._lastName} ${this._firstName}`;
    }

    set fullName(value) {
        [this._lastName, this._firstName] = value.split(' ');
    }

    get age() {
        return new Date().getFullYear() - this._birthYear;
    }

    getPerformanceRating() {
        const gradeValues = Object.values(this._grades);
        const attendaceValues = Object.values(this._visits);
        if (!gradeValues.length) return 0;

        const averageGrade = gradeValues.reduce((sum, grade) => sum + grade, 0) / gradeValues.length;
        const attendancePercentage = (attendaceValues.filter(present => present).length / attendaceValues.length) * 100;

        return (averageGrade + attendancePercentage) / 2;
    }
}
