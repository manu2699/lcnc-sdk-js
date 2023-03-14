import {
	BaseSDK,
	generateId,
	globalInstances,
	LISTENER_CMDS as CMDS
} from "../core";

export class NDEFReader extends BaseSDK {
	id: string;
	constructor() {
		super();
		this.id = generateId(CMDS.WINDOW_NDEF_READER_NEW);
		globalInstances[this.id] = this;
		this._postMessageAsync(CMDS.WINDOW_NDEF_READER_NEW, {
			id: this.id,
			operation: "new"
		});
	}
	scan() {
		this._postMessageAsync(
			CMDS.WINDOW_NDEF_READER_SCAN,
			{ id: this.id, operation: "scan" }
		);
	}
	write(data) {
		this._postMessageAsync(CMDS.WINDOW_NDEF_READER_WRITE, {
			id: this.id,
			operation: "write",
			data
		});
	}

	addEventListener(eventName: string, cb: Function): void {
		this._postMessage(
			CMDS.WINDOW_NDEF_READER_ADD_EVENT_LISTENER,
			{
				id: this.id,
				operation: "addEventListener",
				eventName
			},
			cb
		);
	}

	makeReadOnly() {
		this._postMessageAsync(CMDS.WINDOW_NDEF_READER_MAKE_READONLY, {
			id: this.id,
			operation: "makeReadOnly"
		});
	}

	abortScan() {
		this._postMessageAsync(
			CMDS.WINDOW_NDEF_READER_ABORT_SCAN,
			{ id: this.id, operation: "abortScan" },
			true,
			(data) => data
		);
	}
}
