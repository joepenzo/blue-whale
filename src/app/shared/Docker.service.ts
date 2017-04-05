import { Injectable } from '@angular/core';
import { remote } from 'electron';
import { ContainerInfo, ContainerInspectInfo, ImageInfo, ImageInspectInfo } from 'dockerode';
import * as Dockerode from 'dockerode';

@Injectable()
export class DockerService {

    Docker = remote.require("dockerode");
    docker = new this.Docker({
        socketPath: '/var/run/docker.sock'
    });
 
    constructor() {}

    getInfo(): Promise<any> {
        return this.docker.info();
    }

    getVersion(): Promise<any> {
        return this.docker.version();
    }

    /**
     * all of contatisers
     */
    getContainers(): Promise<Array<ContainerInfo>> {
        return this.docker.listContainers({ all: true });
    }

    /**
     * get container by id
     * @param id get
     */
    getContainer(id: string): Dockerode.Container {
        return this.docker.getContainer(id);
    }

    /**
     * stop container
     * @param id 
     */
    stopContainer(id: string): Promise<ContainerInspectInfo> {
        return this.docker.getContainer(id).stop();
    }

    /**
     * start container
     * @param id 
     */
    startContainer(id: string): Promise<any> {
        return this.docker.getContainer(id).start();
    }

    /**
     * remove container
     * @param id 
     */
    removeContainer(id: string): Promise<any> {
        return this.docker.getContainer(id).remove();
    }

    /**
     * all of locale images
     */
    getImages(): Promise<Array<ImageInfo>> {
        return this.docker.listImages({digests: true});
    }

    /**
     * search for an image on Docker Hub
     * @param name term
     */
    searchImages(trem: String): Promise<any> {
        return this.docker.searchImages({term: trem});
    }

    /**
     * get image by name
     * @param name image name
     */
    getImage(name: string): Dockerode.Image {
        return this.docker.getImage(name);
    }
    
    /**
     * get image inspect
     * @param name 
     */
    getImageInspect(name: string): Promise<ImageInspectInfo> {
        return this.docker.getImage(name).inspect();
    }


}