'use babel';

import Nungwe4tvView from './nungwe4tv-view';
import { CompositeDisposable } from 'atom';

export default {

  nungwe4tvView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.nungwe4tvView = new Nungwe4tvView(state.nungwe4tvViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.nungwe4tvView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'nungwe4tv:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.nungwe4tvView.destroy();
  },

  serialize() {
    return {
      nungwe4tvViewState: this.nungwe4tvView.serialize()
    };
  },

  toggle() {
    console.log('Nungwe4tv was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
