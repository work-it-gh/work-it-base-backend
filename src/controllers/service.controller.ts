// import { Request, Response } from "express";

// import { ServiceModel, UserModel } from "../models";
// import { IJwtPayload } from "../../types";

// export const requestService = async (req: Request, res: Response) => {
//   const { id } = req.user as IJwtPayload;

//   const { serviceTitle, serviceDescription, serviceDate } = req.body;

//   const newService = new ServiceModel({
//     serviceDate,
//     serviceDescription,
//     serviceTitle,
//     clientId: id,
//     serviceStatus: "pending",
//   });

//   await newService.save();

//   return res.status(200).json({
//     status: "success",
//     message: "new service added",
//   });
// };

// export const deleteServiceRequest = async (req: Request, res: Response) => {
//   const { id } = req.user as IJwtPayload;

//   const { serviceId } = req.body;

//   const service = await ServiceModel.findById(serviceId);

//   if (!service) {
//     return res.status(404).json({
//       status: "failure",
//       message: "service does not exist",
//     });
//   }

//   if (service.clientId.toString() !== id) {
//     return res.status(401).json({
//       status: "failure",
//       message: "action not allowed",
//     });
//   }

//   await ServiceModel.deleteOne({ _id: serviceId });

//   return res.status(200).json({
//     status: "success",
//     message: "service deletion successful",
//   });
// };

// export const acceptServiceRequest = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.user as IJwtPayload;

//     const { serviceId } = req.body;

//     const service = await ServiceModel.findById(serviceId);

//     if (!service) {
//       return res.status(404).json({
//         status: "failure",
//         message: "service does not exist",
//       });
//     }

//     if (service.serviceStatus !== "pending") {
//       return res.status(404).json({
//         status: "failure",
//         message: "service is not active",
//       });
//     }

//     await ServiceModel.updateOne(
//       { _id: service._id },
//       { $set: { serviceStatus: "active", serviceProviderId: id } }
//     );

//     return res.status(200).json({
//       status: "success",
//       message: "accepted service request",
//     });
//   } catch (err) {
//     return res.status(400).json({
//       status: 400,
//       message: `Error: ${(err as Error).message}`,
//     });
//   }
// };

// export const updateServiceRequest = async (req: Request, res: Response) => {
//   const { id } = req.user as IJwtPayload;

//   const { serviceTitle, serviceDescription, serviceDate, serviceId } = req.body;

//   const service = await ServiceModel.findById(serviceId);
//   if (!service) {
//     return res.status(404).json({
//       status: "failure",
//       message: "service does not exist",
//     });
//   }

//   if (service.clientId.toString() !== id) {
//     return res.status(401).json({
//       status: "failure",
//       message: "action not allowed",
//     });
//   }

//   await ServiceModel.updateOne(
//     { _id: serviceId },
//     { $set: { serviceTitle, serviceDescription, serviceDate } }
//   );

//   return res.status(200).json({
//     status: "success",
//     message: "service updation successful",
//   });
// };

// // export const provideService = async (req: Request, res: Response) => {
// //   const {id} = req.user as IJwtPayload

// //   const {serviceTitle, serviceDescription} = req.body

// //   const service = new ServiceModel({
// //     serviceTitle,
// //     serviceDescription,
// //   })
// // }
