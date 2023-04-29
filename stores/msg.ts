import { Pinia } from "pinia";
import { defineStore } from "pinia";

type message = {
    id: number,
    type: string,
    content: string,
    time: string,
};
export const useMessagestore = defineStore({
    id: "msg",
    state: () => ({
        error: false,
        messages: [] as message[],
    }),
    actions: {
        throwError(msg: string, duration: number = 5000) {
            const id = this.messages.length;
            console.log("throwing error");
            this.messages.push({
                id: id,
                type: "error",
                content: msg,
                time: new Date().toLocaleTimeString(),
            });
            this.error = true;
            setTimeout(() => {
                this.removeMessage(id);
            }, duration);
        },
        throwWarning(msg: string, duration: number) {
            let id = this.messages.length;
            this.messages.push({
                id: id,
                type: "warning",
                content: msg,
                time: new Date().toLocaleTimeString(),
            });
            setTimeout(() => {
                this.removeMessage(id);
            }, duration);
        },
        throwInfo(msg: string, duration: number) {
            const id = this.messages.length;
            if (duration >= 5000) {
                duration = 5000;
            }
            this.messages.push({
                id: id,
                type: "info",
                content: msg,
                time: new Date().toLocaleTimeString(),
            });
            setTimeout(() => {
                this.removeMessage(id);
            }, duration);
        },
        throwSuccess(msg: string, duration: number= 5000) {
            const id = this.messages.length;
            if (duration >= 5000) {
                duration = 5000;
            }
            this.messages.push({
                id: id,
                type: "success",
                content: msg,
                time: new Date().toLocaleTimeString(),
            });
            setTimeout(() => {
                this.removeMessage(id);
            }, duration);
        },
        clearMessages() {
            this.messages = [];
        },
        popMessage() {
            this.messages.pop();
        },
        removeMessage(id: number) {
            this.messages = this.messages.filter((msg) => msg.id != id);
        }   
    },
});