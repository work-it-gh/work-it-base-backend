import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { AppDataSource } from "../models";
import { Service, User } from "../models";
import { IJwtPayload } from "../../types";

const ServiceRepository = AppDataSource.getRepository(Service);
const UserRepository = AppDataSource.getRepository(User);

export const createClientService = async (req: Request, res: Response) => {
  const { id } = req.user as IJwtPayload;

  const user = await UserRepository.findOne({
    where: { id },
    relations: {
      clientServices: true,
    },
  });

  const { title, description, date } = req.body;

  const service = ServiceRepository.create({
    id: uuidv4(),
    title,
    description,
    date,
  });

  service.client = user!;

  const savedService = await ServiceRepository.save(service);

  if (user) {
    user.clientServices.push(savedService);
    await UserRepository.save(user!);
  } else {
    await ServiceRepository.delete({ id: savedService.id });
    return res.status(401).json({
      status: "FAIL",
      message: "user does not exist",
    });
  }

  return res.status(200).json({
    status: "PASS",
    message: "new service created",
    service: {
      id: savedService.id,
      title: savedService.title,
      description: savedService.description,
      date: savedService.date,
      clientId: id,
      status: savedService.status,
    },
  });
};

export const getAllClientServices = async (req: Request, res: Response) => {
  const { id } = req.user as IJwtPayload;

  const user = await UserRepository.findOne({
    where: { id },
    relations: { clientServices: true },
  });

  return res.status(200).json({
    status: "PASS",
    message: "all client services found",
    services: user?.clientServices,
  });
};

export const updateClientService = async (req: Request, res: Response) => {
  const { serviceId } = req.params;

  const service = await ServiceRepository.findOne({
    where: { id: serviceId },
    relations: { client: true },
  });

  if (!service) {
    return res.status(404).json({
      status: "FAIL",
      message: `service with id: ${serviceId} does not exist`,
    });
  }

  const { id } = req.user as IJwtPayload;

  if (service.client.id !== id) {
    return res.status(403).json({
      status: "FAIL",
      message: "action not allowed because client does not own service",
    });
  }

  const { title, description, date } = req.body;

  service.title = title ?? service.title;
  service.description = description ?? service.description;
  service.date = date ?? service.date;

  const updatedService = await ServiceRepository.save(service);

  return res.status(200).json({
    status: "PASS",
    message: "service updated successfully",
    service: {
      id: updatedService.id,
      title: updatedService.title,
      description: updatedService.description,
      date: updatedService.date,
      clientId: id,
      status: updatedService.status,
    },
  });
};

export const deleteClientService = async (req: Request, res: Response) => {
  const { serviceId } = req.params;

  const service = await ServiceRepository.findOne({
    where: { id: serviceId },
    relations: { client: true },
  });

  if (!service) {
    return res.status(404).json({
      status: "FAIL",
      message: `service with id: ${serviceId} does not exist`,
    });
  }

  const { id } = req.user as IJwtPayload;

  if (service.client.id !== id) {
    return res.status(403).json({
      status: "FAIL",
      message: "action not allowed because client does not own service",
    });
  }

  await ServiceRepository.delete({ id: service.id });
  return res.status(200).json({
    status: "PASS",
    message: "status deleted successfully",
  });
};

export const findServiceWorker = async (req: Request, res: Response) => {
  const { serviceId } = req.params;

  const service = await ServiceRepository.findOne({
    where: { id: serviceId },
    relations: {
      worker: true,
    },
  });

  if (!service) {
    return res.status(404).json({
      status: "FAIL",
      message: `service with id: ${serviceId} does not exist`,
    });
  }

  if (service.worker === null) {
    return res.status(200).json({
      status: "PASS",
      message: "service does not have a worker",
      worker: null,
    });
  }

  const worker = await UserRepository.findOne({
    where: { id: service.worker.id },
  });

  if (!worker) {
    return res.status(404).json({
      status: "FAIL",
      message: "worker does not exist",
    });
  }

  return res.status(200).json({
    status: "PASS",
    message: "service found",
    service,
    worker,
  });
};
