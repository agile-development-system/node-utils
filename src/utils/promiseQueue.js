/*
 * @Description: promise执行队列
 * @Author: yaojin
 * @Usage: const { createPromiseQueue } = require('@wanwu/cli-utils'); const queue = createPromiseQueue(); queue.add(() => <Promise> );
 */
class Task {
    constructor(params = {}) {
        this.handle = params.handle;
        this.version = params.version;
        this.callback = params.callback;
    }
}

class PromiseQueue {
    constructor() {
        this.tasks = [];
        this.ing = false; // 执行中状态
        this.version = 1; // 每一期任务的版本，重置之后会更新版本，过时任务不做处理
    }

    add(taskHandle, callback) {
        this.tasks.push(new Task({
            handle: taskHandle,
            version: this.version,
            callback,
        }));
        if (!this.ing) {
            this.exec();
        }
    }

    exec() {
        if (this.tasks.length > 0) {
            const task = this.tasks.shift();
            if (!this.isTaskOverdue(task)) {
                this.ing = true;
                task.handle()
                    .then(res => {
                        this.ing = false;
                        if (task.callback) {
                            task.callback(res);
                        }
                        this.exec();
                    })
                    .catch(res => {
                        this.ing = false;
                        if (task.callback) {
                            task.callback(res);
                        }
                        this.exec();
                    });
            } else {
                this.ing = false;
                this.exec();
            }
        } else {
            this.ing = false;
        }
    }

    reset() {
        this.tasks = [];
        this.ing = false;
        this.version++;
    }

    isTaskOverdue(task) {
        return task.version !== this.version;
    }
}

module.exports = () => {
    return new PromiseQueue();
};
