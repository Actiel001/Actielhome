// import { NextResponse } from 'next/server';
// import connection from '../../../lib/db';

// export async function POST(req) {
//   try {
//     const { message } = await req.json();
    
//     const [result] = await connection.execute(
//       'INSERT INTO messages (message) VALUES (?)',
//       [message]
//     );

//     return NextResponse.json({ success: true, insertId: result.insertId });
//   } catch (error) {
//     console.error('Database error:', error);
//     return NextResponse.json({ success: false, error: error.message });
//   }
// }
// pages/api/contact.js (or your chosen API route)

import { NextResponse } from 'next/server';
import supabase from '../../../lib/supabase';

export async function POST(req) {
  try {
    const { message } = await req.json();

    const { data, error } = await supabase.from('messages').insert([{ message }]);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
