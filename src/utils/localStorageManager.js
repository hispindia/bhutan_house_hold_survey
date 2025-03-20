class LocalStorageTab {
    constructor(defaultValue = 3) {
        this.key = 'tab';
        if (localStorage.getItem(this.key) === null) {
            this.set(defaultValue);
        }
    }

    get() {
        return localStorage.getItem(this.key);
    }

    set(value) {
        localStorage.setItem(this.key, value);
    }

    remove() {
        localStorage.removeItem(this.key);
    }
}

class LocalStorageMemberForm {
    constructor(defaultValue = 'NONE') {
        this.key = 'FORM_TYPE';
        if (localStorage.getItem(this.key) === null) {
            this.set(defaultValue);
        }
    }

    get() {
        return localStorage.getItem(this.key);
    }

    set(value) {
        localStorage.setItem(this.key, value);
    }

    remove() {
        localStorage.removeItem(this.key);
    }
}
class LocalStorageSelecteRow {
    constructor(defaultValue = {}) {
        this.key = 'row';
        if (localStorage.getItem(this.key) === null) {
            this.set(defaultValue);
        }
    }

    get() {
        return JSON.parse(localStorage.getItem(this.key) || '{}');
    }

    set(value) {
        localStorage.setItem(this.key, JSON.stringify(value));
    }

    remove() {
        localStorage.removeItem(this.key);
    }
}
export {
    LocalStorageTab,
    LocalStorageMemberForm,
    LocalStorageSelecteRow,
}