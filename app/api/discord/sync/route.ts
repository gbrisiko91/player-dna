import { NextResponse } from 'next/server';

// Mapping degli archetipi ai nomi dei ruoli su Discord
const ROLE_MAPPING: Record<string, string> = {
  "Clutch Demon": "Clutch Demon",
  "Tilt Berserker": "Tilt Berserker",
  "The Silent Killer": "The Silent Killer",
  "The Main Character": "The Main Character",
  "Zen Master": "Zen Master",
  "The Fake Chill": "The Fake Chill",
  "Tactical Monk": "Tactical Monk",
  "Chaos Merchant": "Chaos Merchant",
  "Human Shield": "Human Shield",
  "Economic God": "Economic God",
  "The Gatekeeper": "The Gatekeeper",
  "The Specialist": "The Specialist",
};

export async function POST(req: Request) {
  try {
    const { userId, archetype, discordId } = await req.json();

    const botToken = process.env.DISCORD_BOT_TOKEN;
    const guildId = process.env.DISCORD_GUILD_ID;

    if (!botToken || !guildId) {
      console.error("Missing Discord Bot Token or Guild ID");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    // 1. Ottieni la lista dei ruoli del server
    const rolesResponse = await fetch(`https://discord.com/api/v10/guilds/${guildId}/roles`, {
      headers: {
        Authorization: `Bot ${botToken}`,
      },
    });

    if (!rolesResponse.ok) {
      const errorData = await rolesResponse.json();
      console.error("Error fetching roles:", errorData);
      return NextResponse.json({ error: "Failed to fetch roles" }, { status: 500 });
    }

    const roles = await rolesResponse.json();
    const roleName = ROLE_MAPPING[archetype];
    const targetRole = roles.find((r: any) => r.name === roleName);

    if (!targetRole) {
      console.error(`Role not found: ${roleName}`);
      return NextResponse.json({ error: "Role not found on server" }, { status: 404 });
    }

    // 2. Assegna il ruolo all'utente
    const assignResponse = await fetch(
      `https://discord.com/api/v10/guilds/${guildId}/members/${discordId}/roles/${targetRole.id}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bot ${botToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!assignResponse.ok) {
      const errorData = await assignResponse.json();
      console.error("Error assigning role:", errorData);
      return NextResponse.json({ error: "Failed to assign role" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Discord Sync Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
