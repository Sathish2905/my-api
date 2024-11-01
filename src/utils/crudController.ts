import { Request, Response } from 'express';
import { Model, Document } from 'mongoose';
import { handleError, handleNotFound, sendSuccess } from './routeHelpers';

export class CrudController<T extends Document> {
  constructor(
    private model: Model<T>,
    private entityName: string
  ) {}

  create = async (req: Request, res: Response) => {
    try {
      const newItem = new this.model(req.body);
      const saved = await newItem.save();
      return sendSuccess(res, saved, 201);
    } catch (error) {
      return handleError(res, error);
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const items = await this.model.find();
      return sendSuccess(res, items);
    } catch (error) {
      return handleError(res, error);
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const item = await this.model.findById(req.params.id);
      if (!item) return handleNotFound(res, this.entityName);
      return sendSuccess(res, item);
    } catch (error) {
      return handleError(res, error);
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const updated = await this.model.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updated) return handleNotFound(res, this.entityName);
      return sendSuccess(res, updated);
    } catch (error) {
      return handleError(res, error);
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const deleted = await this.model.findByIdAndDelete(req.params.id);
      if (!deleted) return handleNotFound(res, this.entityName);
      return sendSuccess(res, deleted);
    } catch (error) {
      return handleError(res, error);
    }
  };
} 