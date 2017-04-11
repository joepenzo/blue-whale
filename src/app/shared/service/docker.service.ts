import { Injectable } from '@angular/core';
import { remote } from 'electron';
import { ContainerInfo, ContainerInspectInfo, ImageInfo, ImageInspectInfo, ImageRemoveInfo } from 'dockerode';
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
     * @param options 
     */
    removeContainer(id: string, options?: {}): Promise<any> {
        return this.docker.getContainer(id).remove(options);
    }

    /**
     * restart
     * @param id 
     * @param options 
     */
    restartContainer(id: string, options?: {}) {
        return this.docker.getContainer(id).restart(options);
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
    searchImages(options: {}): Promise<any> {
        return this.docker.searchImages(options);
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

    /**
     * remove image
     * @param name
     * @param options 
     */
    removeImage(name: string, options?: {}): Promise<ImageRemoveInfo> {
        return this.docker.getImage(name).remove(options);
    }

    /**
     * pull image
     * @param repoTag 
     * @param options 
     */
    pullImage(repoTag: string, options?: {}): Promise<Dockerode.Image> {
        return this.docker.pull(repoTag, options);
    }

}