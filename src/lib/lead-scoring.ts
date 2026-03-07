// Advanced Lead Scoring Engine
// Calculates lead quality based on multiple factors

export interface ScoringFactors {
  budget: number;
  timeline: number;
  projectScope: number;
  engagement: number;
  industry: number;
  company: number;
  techFit: number;
}

export function calculateLeadScore(lead: any): { score: number; tier: string; factors: ScoringFactors } {
  let factors: ScoringFactors = {
    budget: 0,
    timeline: 0,
    projectScope: 0,
    engagement: 0,
    industry: 0,
    company: 0,
    techFit: 0,
  };

  // Budget scoring (0-30 points)
  if (lead.budgetRange) {
    if (lead.budgetRange.includes("100k") || lead.budgetRange.includes("250k+")) factors.budget = 30;
    else if (lead.budgetRange.includes("50k") || lead.budgetRange.includes("75k")) factors.budget = 25;
    else if (lead.budgetRange.includes("25k")) factors.budget = 20;
    else if (lead.budgetRange.includes("10k") || lead.budgetRange.includes("15k")) factors.budget = 10;
    else factors.budget = 5;
  }

  // Timeline scoring (0-20 points)
  if (lead.timeline) {
    if (lead.timeline === "urgent" || lead.timeline === "ASAP") factors.timeline = 20;
    else if (lead.timeline === "1-3-months") factors.timeline = 15;
    else if (lead.timeline === "3-6-months") factors.timeline = 10;
    else if (lead.timeline === "6-12-months") factors.timeline = 5;
  }

  // Project scope scoring (0-15 points)
  if (lead.message && lead.message.length) {
    if (lead.message.length > 500) factors.projectScope = 15;
    else if (lead.message.length > 250) factors.projectScope = 10;
    else if (lead.message.length > 100) factors.projectScope = 5;
  }

  // Engagement scoring (0-15 points) - based on contact info completeness
  let contactInfoScore = 0;
  if (lead.fullName) contactInfoScore += 3;
  if (lead.email) contactInfoScore += 3;
  if (lead.company) contactInfoScore += 3;
  if (lead.country) contactInfoScore += 3;
  if (lead.timezone) contactInfoScore += 3;
  factors.engagement = Math.min(contactInfoScore, 15);

  // Industry scoring (0-10 points)
  const highValueIndustries = ["fintech", "healthcare", "ecommerce", "enterprise"];
  if (lead.serviceCategory) {
    const category = lead.serviceCategory.toLowerCase();
    if (highValueIndustries.some((ind) => category.includes(ind))) {
      factors.industry = 10;
    }
  }

  // Company scoring (0-5 points)
  if (lead.company) {
    if (lead.company.length > 10) factors.company = 5;
    else factors.company = 2;
  }

  // Tech fit scoring (0-5 points)
  if (lead.techPreference) {
    const premiumTechs = ["nextjs", "react", "typescript", "node", "python", "golang"];
    if (premiumTechs.some((tech) => lead.techPreference.toLowerCase().includes(tech))) {
      factors.techFit = 5;
    }
  }

  const totalScore =
    factors.budget + factors.timeline + factors.projectScope + factors.engagement + factors.industry + factors.company + factors.techFit;

  // Determine tier
  let tier = "COLD";
  if (totalScore >= 70) tier = "HOT";
  else if (totalScore >= 40) tier = "WARM";

  return {
    score: totalScore,
    tier,
    factors,
  };
}

export function getScoreTrend(oldScore: number, newScore: number): "up" | "down" | "neutral" {
  if (newScore > oldScore) return "up";
  if (newScore < oldScore) return "down";
  return "neutral";
}

export function getRecommendedActions(lead: any, score: number): string[] {
  const actions: string[] = [];

  if (score >= 80) {
    actions.push("Immediately contact this lead");
    actions.push("Prepare proposal draft");
    actions.push("Schedule follow-up call");
  } else if (score >= 60) {
    actions.push("Contact within 24 hours");
    actions.push("Send intro email");
    actions.push("Assess budget fit");
  } else if (score >= 40) {
    actions.push("Queue for follow-up");
    actions.push("Send resource email");
    actions.push("Nurture with content");
  } else {
    actions.push("Add to nurture sequence");
    actions.push("Monitor for re-engagement");
  }

  if (lead.budget >= 100000) {
    actions.push("Involve senior team member");
  }

  return actions;
}

export function calculateLeadLifetimeValue(lead: any): number {
  // Estimate LTV based on various factors
  let ltv = 1000; // Base value

  // Budget multiplier
  if (lead.budgetRange?.includes("100k")) ltv *= 10;
  else if (lead.budgetRange?.includes("50k")) ltv *= 5;
  else if (lead.budgetRange?.includes("25k")) ltv *= 2.5;

  // Engagement multiplier
  if (lead.events?.length > 5) ltv *= 1.3;
  if (lead.message?.length > 300) ltv *= 1.2;

  // Industry multiplier (recurring revenue potential)
  const recurringIndustries = ["saas", "fintech", "ecommerce"];
  if (recurringIndustries.some((ind) => lead.serviceCategory?.toLowerCase().includes(ind))) {
    ltv *= 3; // Higher LTV for recurring revenue potential
  }

  return Math.round(ltv);
}
