import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const { username } = await request.json();
  console.log(username)
  try {
    return Response.json(
      await prisma.user.findMany({
        where: {
          AND: {
            firstName: { contains: username ,mode: 'insensitive'},
            Role: { not: "student" },
          },
        },
        select: {
          id: true,
          firstName: true,
        },
      })
    );
  } catch (err) {
    console.log(err);
    return Response.json({ msg: "error while fetching data" });
  }
}
