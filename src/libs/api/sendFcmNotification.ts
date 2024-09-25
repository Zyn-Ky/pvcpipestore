import { Notification } from "firebase-admin/messaging";
import {
  ExtendedNotificationPayloadMain,
  GenerateFcmTopicName,
} from "../config";
import { AdminFirebaseMessaging } from "../firebase/adminConfig";

export default async function SendFCMNotification(
  topicCategory: string[] | string,
  notificationDetails: ExtendedNotificationPayloadMain
) {
  const topicname = Array.isArray(topicCategory)
    ? GenerateFcmTopicName(...topicCategory)
    : GenerateFcmTopicName(topicCategory.split("-").slice(2).join("-"));
  console.log(topicname);
  return await AdminFirebaseMessaging.send({
    topic: "/topics/" + topicname ?? "",
    // notification: {},
    data: { ...notificationDetails },
    // webpush: { notification: { ...notificationDetails } },
  });
}
