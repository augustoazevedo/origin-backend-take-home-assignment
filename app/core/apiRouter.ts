import { EventEmitter } from 'events';
import express from 'express';

export abstract class ApiRouter extends EventEmitter {
  public abstract active(): boolean;
  public abstract applyRoutes(application: express.Application | express.Router): void;
}
