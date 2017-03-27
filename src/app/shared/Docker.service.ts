import { Injectable } from '@angular/core';

import { remote } from 'electron'

@Injectable()
export class DockerService {

    constructor() {
        console.log(remote.getCurrentWindow());

        const Docker = remote.require("dockerode");
        const docker = new Docker({
            socketPath: '/var/run/docker.sock'
        });

        docker.listContainers({ all: true }).then((containers) => {
            console.log(containers);
        });
    }

}