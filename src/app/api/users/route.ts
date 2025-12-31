import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Query parameters
    const search = searchParams.get("search") || "";
    const roleFilter = searchParams.get("role") || "all";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const allUsers: any[] = [];
    let totalCount = 0;

    // Charities for role=all or role=charity
    if (roleFilter === "all" || roleFilter === "charity") {
      const charityWhere: any = {};

      if (search) {
        charityWhere.OR = [
          { name: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
        ];
      }

      const charities = await prisma.charities.findMany({
        where: charityWhere,
        select: {
          charity_id: true,
          name: true,
          email: true,
          verified: true,
          created_on: true,
        },
      });

      const transformedCharities = charities.map((charity) => ({
        user_id: charity.charity_id,
        first_name: charity.name,
        last_name: "", // Charities don't have last names
        email: charity.email,
        role: "charity",
        is_verified: charity.verified,
        created_on: charity.created_on,
        userType: "charity",
      }));

      allUsers.push(...transformedCharities);
    }

    // Users (donor/admin/all)
    if (
      roleFilter === "all" ||
      roleFilter === "donor" ||
      roleFilter === "admin"
    ) {
      const userWhere: any = {};

      if (search) {
        userWhere.OR = [
          { first_name: { contains: search, mode: "insensitive" } },
          { last_name: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
        ];
      }

      // 🔧 FIX: only filter by role when donor/admin, NEVER when "all"
      if (roleFilter === "donor" || roleFilter === "admin") {
        userWhere.role = roleFilter;
      }

      const users = await prisma.user.findMany({
        where: userWhere,
        select: {
          user_id: true,
          first_name: true,
          last_name: true,
          email: true,
          role: true,
          is_verified: true,
          created_on: true,
        },
      });

      const transformedUsers = users.map((user) => ({
        ...user,
        userType: "user",
      }));

      allUsers.push(...transformedUsers);
    }

    // Sort by newest
    allUsers.sort(
      (a, b) =>
        new Date(b.created_on).getTime() - new Date(a.created_on).getTime()
    );

    // Pagination
    totalCount = allUsers.length;
    const totalPages = Math.ceil(totalCount / pageSize);
    const paginatedUsers = allUsers.slice(skip, skip + pageSize);

    return NextResponse.json({
      users: paginatedUsers,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        pageSize,
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
