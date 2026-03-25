import { NextResponse } from 'next/server';
import mysql from '@/lib/mysql';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const customDate = searchParams.get('date');

  try {
    console.log('Fetching dashboard stats...');
    // 1. Product Count
    const prodResults: any = await mysql.query('SELECT COUNT(*) as count FROM products');
    const prodCount = prodResults[0]?.count || 0;

    // 2. Active Subscriptions (Resilient Case-Insensitive Check)
    const subResults: any = await mysql.query("SELECT COUNT(*) as count FROM subscriptions WHERE LOWER(TRIM(status)) = 'active'");
    const activeSubCount = subResults[0]?.count || 0;

    // 3. Completed Deliveries
    const delResults: any = await mysql.query("SELECT COUNT(*) as count FROM deliveries WHERE LOWER(TRIM(status)) = 'delivered'");
    const deliveryCount = delResults[0]?.count || 0;

    // 4. Revenue Today
    const revenueTodayResults: any = await mysql.query(
      "SELECT SUM(amount_paid) as total FROM subscriptions WHERE DATE(created_at) = CURDATE()"
    );
    const todayRevenue = revenueTodayResults[0]?.total || 0;

    // 5. Revenue Yesterday
    const revenueYesterdayResults: any = await mysql.query(
      "SELECT SUM(amount_paid) as total FROM subscriptions WHERE DATE(created_at) = DATE_SUB(CURDATE(), INTERVAL 1 DAY)"
    );
    const yesterdayRevenue = revenueYesterdayResults[0]?.total || 0;

    // 6. Recent Subscriptions
    const recentSubs = await mysql.query(
      "SELECT * FROM subscriptions ORDER BY created_at DESC LIMIT 5"
    );

    console.log(`Stats fetched: Prods:${prodCount}, Subs:${activeSubCount}, Recent:${Array.isArray(recentSubs) ? recentSubs.length : 0}`);

    // 7. Custom Date Revenue (if provided)
    let customRevenue = null;
    if (customDate) {
      const customResults: any = await mysql.query(
        "SELECT SUM(amount_paid) as total FROM subscriptions WHERE DATE(created_at) = ?",
        [customDate]
      );
      customRevenue = customResults[0]?.total || 0;
    }

    return NextResponse.json({
      products: prodCount,
      activeSubscriptions: activeSubCount,
      completedDeliveries: deliveryCount,
      todayRevenue,
      yesterdayRevenue,
      recentSubs,
      customRevenue
    });
  } catch (error: any) {
    console.error('Stats Error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch stats', 
      details: error.message || String(error)
    }, { status: 500 });
  }
}
