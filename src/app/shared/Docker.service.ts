import { Injectable } from '@angular/core';
import { remote } from 'electron'
import { ContainerInfo } from 'dockerode'

@Injectable()
export class DockerService {

    Docker = remote.require("dockerode");
    docker = new this.Docker({
        socketPath: '/var/run/docker.sock'
    });

    constructor() {
    }

    /**
     * all of contatisers
     */
    getContainers(): Promise<ContainerInfo> {
        return this.docker.listContainers({ all: true });
    }

}