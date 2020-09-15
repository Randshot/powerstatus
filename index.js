const { React, getModuleByDisplayName } = require('powercord/webpack');
const { Plugin } = require('powercord/entities');
var { getModule } = require('powercord/webpack');

const Settings = require('./Settings.jsx');

module.exports = class PowerStatus extends Plugin {
    startPlugin() {
        if (!this.settings.get('statuses'))
          this.settings.set('statuses', '');
        if (!this.settings.get('statusPrefixes'))
          this.settings.set('statusPrefixes', '');
        if (!this.settings.get('statusSuffixes'))
          this.settings.set('statusSuffixes', '');
        if (!this.settings.get('delay'))
          this.settings.set('delay', 120);
        if (this.settings.get('enable') == null)
          this.settings.set('enable', true);
        if (this.settings.get('randomStatus') == null)
          this.settings.set('enable', true);
        
        powercord.api.settings.registerSettings('powerstatus', {
            category: this.entityID,
            label: 'Custom Status',
            render: Settings
        });

        this.main();
    }

    pluginWillUnload () {
        powercord.api.settings.unregisterSettings('powerstatus');
    }

    async main() {
        const statusPrefixes = this.settings.get('statusPrefixes').split("\n");
        const statuses = this.settings.get('statuses').split("\n");
        const statusSuffixes = this.settings.get('statusSuffixes').split("\n");

        if(statuses.length < 2)
            return;
        
        var delay = parseInt(this.settings.get('delay')) * 1000;
        delay = delay < 1 ? 1 : delay;

        var statusIndex = 0;
        var prefixIndex = 0;
        var suffixIndex = 0;

        if(this.settings.get('randomStatus')) {
            // Math.floor(Math.random() * (max - min) + min);
            statusIndex = Math.floor(Math.random() * statuses.length);
            prefixIndex = Math.floor(Math.random() * statusPrefixes.length);
            suffixIndex = Math.floor(Math.random() * statusSuffixes.length);
        } else {
            statusIndex = Math.round((new Date()).getTime() / delay) % statuses.length;
            prefixIndex = Math.round((new Date()).getTime() / delay) % statusPrefixes.length;
            suffixIndex = Math.round((new Date()).getTime() / delay) % statusSuffixes.length;
        }

        statusIndex = statusIndex >= statuses.length ? statuses.length - 1 : statusIndex;
        prefixIndex = prefixIndex >= statusPrefixes.length ? statusPrefixes.length - 1 : prefixIndex;
        suffixIndex = suffixIndex >= statusSuffixes.length ? statusSuffixes.length - 1 : suffixIndex;

        if(this.settings.get('enable')) {
            await this.setStatus(`${statusPrefixes[prefixIndex]}${statuses[statusIndex]}${statusSuffixes[suffixIndex]}`);
        }
        setTimeout(() => {
            this.main();
        }, delay);
    }

    async setStatus(text) {
        require('powercord/webpack').getModule(['updateRemoteSettings'], false).updateRemoteSettings({
            customStatus: {
                text: text
            }
        });
    }
}
