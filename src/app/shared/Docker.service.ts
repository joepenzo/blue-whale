import { Injectable } from '@angular/core';
import { remote } from 'electron'
import { ContainerInfo, ContainerInspectInfo } from 'dockerode'

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
    getContainers(): Promise<Array<ContainerInfo>> {
        return this.docker.listContainers({ all: true });
    }

    /**
     * stop container
     * @param id 
     */
    stopContainer(id: String): Promise<ContainerInspectInfo> {
        return this.docker.getContainer(id).stop();
    }

    /**
     * start container
     * @param id 
     */
    startContainer(id: String): Promise<ContainerInspectInfo> {
        return this.docker.getContainer(id).start();
    }


}