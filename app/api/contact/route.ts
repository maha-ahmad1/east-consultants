import { NextRequest, NextResponse } from "next/server";

const BASEROW_API_URL = process.env.BASEROW_API_URL || "https://api.baserow.io";

export async function POST(request: NextRequest) {
  const token = process.env.BASEROW_API_TOKEN;
  const tableId = process.env.BASEROW_TABLE_ID;

  if (!token || !tableId) {
    return NextResponse.json(
      { error: "Baserow غير مُعد على الخادم." },
      { status: 500 }
    );
  }

  const body = await request.json();
  const { name, phone, email, service, message } = body ?? {};

  if (!name || !phone || !email || !message) {
    return NextResponse.json({ error: "بيانات ناقصة." }, { status: 400 });
  }

  const response = await fetch(
    `${BASEROW_API_URL}/api/database/rows/table/${tableId}/?user_field_names=true`,
    {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name: name,
        Phone: phone,
        Email: email,
        "Project Type": service,
        Message: message,
      }),
    }
  );

  if (!response.ok) {
    const detail = await response.text();
    return NextResponse.json(
      { error: "تعذّر إرسال الطلب إلى Baserow.", detail },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
