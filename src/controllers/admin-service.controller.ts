import { Request, Response } from "express";

import { AppDataSource } from "../models";
import { Service, User, Profile } from "../models";
import { IJwtPayload } from "../../types";
import { In, Not } from "typeorm";

const UserRepository = AppDataSource.getRepository(User);
const ProfileRepository = AppDataSource.getRepository(Profile);
const ServiceRepository = AppDataSource.getRepository(Service);

export const assignServiceToWorker = async (req: Request, res: Response) => {
  const { workerId, serviceId } = req.body;

  const { id } = req.user as IJwtPayload;

  const admin = await UserRepository.findOne({ where: { id } });

  const worker = await UserRepository.findOne({
    where: { id: workerId },
    relations: { profile: true },
  });
  if (!worker) {
    return res.status(404).json({
      status: "FAIL",
      message: "worker does not exist",
    });
  }

  if (worker.role === "client" || worker.role === "admin") {
    return res.status(400).json({
      status: "FAIL",
      message: "cannot assign service to non-worker",
    });
  }

  const service = await ServiceRepository.findOne({
    where: { id: serviceId },
    loadRelationIds: true,
  });
  if (!service) {
    return res.status(404).json({
      status: "FAIL",
      message: "service does not exist",
    });
  }

  service.assignedBy = admin!;
  // admin?.adminServicesAssigned.push(service);

  service.worker = worker;
  service.status = "assigned";
  // worker.workerServices.push(service);

  await UserRepository.save(worker);
  await UserRepository.save(admin!);
  await ServiceRepository.save(service);

  return res.status(200).json({
    status: "PASS",
    message: "service assigned to worker",
    service,
  });
};

export const getAllActiveServices = async (req: Request, res: Response) => {
  const services = await ServiceRepository.find({
    where: { status: "active" },
    relations: {
      worker: true,
      client: true,
    },
    loadRelationIds: true,
  });

  return res.status(200).json({
    status: "PASS",
    message: "all active services returned",
    services,
  });
};

export const getAllCompletedServices = async (req: Request, res: Response) => {
  const services = await ServiceRepository.find({
    where: { status: "completed" },
    relations: {
      worker: true,
      client: true,
    },
    loadRelationIds: true,
  });

  return res.status(200).json({
    status: "PASS",
    message: "all completed services returned",
    services,
  });
};

export const getAllAssignedServices = async (req: Request, res: Response) => {
  const services = await ServiceRepository.find({
    where: { status: "assigned" },
    relations: {
      worker: true,
      client: true,
    },
    loadRelationIds: true,
  });

  return res.status(200).json({
    status: "PASS",
    message: "all assigned services returned",
    services,
  });
};

export const getAllWorkers = async (req: Request, res: Response) => {
  const allWorkers = await UserRepository.find({
    where: { role: Not(In(["client", "admin"])) },
  });

  const workers = allWorkers.map((worker) => {
    return {
      id: worker.id,
      email: worker.email,
      phone: worker.phone,
      role: worker.role,
    };
  });

  return res.status(200).json({
    status: "PASS",
    message: "all workers returned",
    allWorkers: workers,
  });
};
