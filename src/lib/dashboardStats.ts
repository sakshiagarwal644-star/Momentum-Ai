import { supabase } from './supabase';

export async function getIdeasCountThisWeek(): Promise<number> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return 0;

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { count, error } = await supabase
      .from('ideas')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('created_at', sevenDaysAgo.toISOString());

    if (error) {
      console.error('Error fetching ideas count:', error);
      return 0;
    }

    return count || 0;
  } catch (err) {
    console.error('Error:', err);
    return 0;
  }
}

export async function getScriptsCount(): Promise<number> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return 0;

    const { count, error } = await supabase
      .from('content_items')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('content_type', 'script');

    if (error) {
      console.error('Error fetching scripts count:', error);
      return 0;
    }

    return count || 0;
  } catch (err) {
    console.error('Error:', err);
    return 0;
  }
}

export async function getRawClipsCount(): Promise<number> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return 0;

    const { count, error } = await supabase
      .from('raw_clips')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('status', 'pending');

    if (error) {
      console.error('Error fetching raw clips count:', error);
      return 0;
    }

    return count || 0;
  } catch (err) {
    console.error('Error:', err);
    return 0;
  }
}

export async function getScheduledPostsCount(): Promise<number> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return 0;

    const today = new Date();
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(sevenDaysLater.getDate() + 7);

    const { count, error } = await supabase
      .from('weekly_calendar')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('scheduled_date', today.toISOString())
      .lte('scheduled_date', sevenDaysLater.toISOString());

    if (error) {
      console.error('Error fetching scheduled posts count:', error);
      return 0;
    }

    return count || 0;
  } catch (err) {
    console.error('Error:', err);
    return 0;
  }
}

export async function getConsistencyScore(): Promise<number> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return 0;

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { data, error } = await supabase
      .from('weekly_calendar')
      .select('scheduled_date')
      .eq('user_id', user.id)
      .eq('status', 'published')
      .gte('scheduled_date', sevenDaysAgo.toISOString());

    if (error) {
      console.error('Error fetching consistency score:', error);
      return 0;
    }

    const uniqueDays = new Set(
      (data || []).map(item => new Date(item.scheduled_date).toDateString())
    );

    const daysPosted = uniqueDays.size;
    const consistencyScore = Math.round((daysPosted / 7) * 100);

    return Math.min(consistencyScore, 100);
  } catch (err) {
    console.error('Error:', err);
    return 0;
  }
}
