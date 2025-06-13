"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addCache(
  gc: string,
  name: string,
  date: string,
  owner: string
) {
  try {
    await prisma.cache.create({
      data: {
        gc,
        name,
        date: new Date(date),
        owner,
      },
    });
    revalidatePath("/caches");
    return { success: true };
  } catch (error) {
    console.error("Error adding cache:", error);
    return { success: false, error: "Failed to add cache" };
  }
}

export async function addLog(gc: string, name: string, date: string) {
  try {
    await prisma.log.create({
      data: {
        gc,
        name,
        date: new Date(date),
      },
    });
    revalidatePath("/logs");
    return { success: true };
  } catch (error) {
    console.error("Error adding log:", error);
    return { success: false, error: "Failed to add log" };
  }
}

export async function getCaches() {
  try {
    const caches = await prisma.cache.findMany({
      orderBy: {
        date: "desc",
      },
    });
    return caches;
  } catch (error) {
    console.error("Error fetching caches:", error);
    return [];
  }
}

export async function getLogs() {
  try {
    const logs = await prisma.log.findMany({
      orderBy: {
        date: "desc",
      },
    });
    return logs;
  } catch (error) {
    console.error("Error fetching logs:", error);
    return [];
  }
}
