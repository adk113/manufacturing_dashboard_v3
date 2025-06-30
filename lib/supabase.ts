import { createClient } from "@supabase/supabase-js"

// Check if we're in a browser environment and if environment variables are available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Create a mock client for development/demo purposes when env vars are missing
const createSupabaseClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("⚠️ Supabase environment variables not found. Running in demo mode.")

    // Return a mock client that doesn't make real API calls
    return {
      from: (table: string) => ({
        select: (columns?: string) => ({
          eq: (column: string, value: any) => ({
            order: (column: string, options?: any) => ({
              limit: (count: number) => Promise.resolve({ data: [], error: null }),
            }),
            limit: (count: number) => Promise.resolve({ data: [], error: null }),
          }),
          order: (column: string, options?: any) => ({
            eq: (column: string, value: any) => ({
              limit: (count: number) => Promise.resolve({ data: [], error: null }),
            }),
            limit: (count: number) => Promise.resolve({ data: [], error: null }),
          }),
          limit: (count: number) => Promise.resolve({ data: [], error: null }),
        }),
        insert: (data: any) => Promise.resolve({ data: null, error: null }),
        update: (data: any) => Promise.resolve({ data: null, error: null }),
        delete: () => Promise.resolve({ data: null, error: null }),
      }),
      auth: {
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        signIn: () => Promise.resolve({ data: null, error: null }),
        signOut: () => Promise.resolve({ error: null }),
      },
    } as any
  }

  return createClient(supabaseUrl, supabaseAnonKey)
}

export const supabase = createSupabaseClient()

// Database types remain the same
export interface Plant {
  id: string
  name: string
  location: string
  timezone: string
  created_at: string
  updated_at: string
}

export interface ProductionLine {
  id: string
  plant_id: string
  name: string
  capacity_per_hour: number
  status: string
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  sku: string
  name: string
  category: string
  unit_price: number
  target_yield: number
  created_at: string
  updated_at: string
}

export interface Employee {
  id: string
  employee_id: string
  name: string
  role: string
  shift: string
  plant_id: string
  created_at: string
  updated_at: string
}

export interface FiveSAudit {
  id: string
  plant_id: string
  line_id: string
  audit_date: string
  auditor_id: string
  sort_score: number
  set_in_order_score: number
  shine_score: number
  standardize_score: number
  sustain_score: number
  overall_score: number
  comments: string
  photos: any
  created_at: string
  auditor?: Employee
  line?: ProductionLine
}

export interface ProductionData {
  id: string
  plant_id: string
  line_id: string
  product_id: string
  shift: string
  production_date: string
  hour_of_day: number
  planned_production: number
  actual_production: number
  good_units: number
  rejected_units: number
  downtime_minutes: number
  downtime_reason: string
  operator_id: string
  created_at: string
  product?: Product
  operator?: Employee
  line?: ProductionLine
}

export interface QualityInspection {
  id: string
  plant_id: string
  line_id: string
  product_id: string
  batch_number: string
  inspection_date: string
  inspector_id: string
  inspected_quantity: number
  passed_quantity: number
  failed_quantity: number
  yield_percent: number
  defect_category: string
  comments: string
  created_at: string
  product?: Product
  inspector?: Employee
  line?: ProductionLine
}

export interface ResourceConsumption {
  id: string
  plant_id: string
  line_id: string
  consumption_date: string
  shift: string
  labor_hours: number
  labor_cost: number
  power_kwh: number
  power_cost: number
  fuel_liters: number
  fuel_cost: number
  maintenance_cost: number
  other_costs: number
  total_cost: number
  created_at: string
  line?: ProductionLine
}

export interface KaizenIdea {
  id: string
  title: string
  description: string
  category: string
  priority: string
  current_state: string
  proposed_solution: string
  expected_benefit: string
  estimated_savings: number
  submitter_id: string
  status: string
  implementation_date: string
  actual_savings: number
  plant_id: string
  line_id: string
  attachments: any
  created_at: string
  updated_at: string
  submitter?: Employee
  line?: ProductionLine
}

export interface SafetyEvent {
  id: string
  plant_id: string
  line_id: string
  event_date: string
  event_type: string
  severity: string
  description: string
  injured_person_id: string
  reported_by: string
  immediate_action: string
  root_cause: string
  corrective_action: string
  status: string
  photos: any
  created_at: string
  updated_at: string
  reporter?: Employee
  injured_person?: Employee
  line?: ProductionLine
}

export interface EnvironmentalData {
  id: string
  plant_id: string
  measurement_date: string
  scope1_emissions_kg: number
  scope2_emissions_kg: number
  water_consumption_liters: number
  waste_generated_kg: number
  waste_recycled_kg: number
  energy_consumption_kwh: number
  renewable_energy_kwh: number
  created_at: string
}

export interface EmployeeFeedback {
  id: string
  employee_id: string
  feedback_date: string
  morale_rating: number
  satisfaction_rating: number
  feedback_text: string
  suggestions: string
  anonymous: boolean
  created_at: string
  employee?: Employee
}

export interface TrainingRecord {
  id: string
  employee_id: string
  training_name: string
  training_category: string
  completion_date: string
  expiry_date: string
  score: number
  trainer: string
  certification_number: string
  created_at: string
  employee?: Employee
}

// Helper function to handle Supabase errors
export function handleSupabaseError(error: any) {
  console.error("Supabase error:", error)
  return {
    success: false,
    error: error?.message || "An unexpected error occurred",
  }
}

// Helper function for successful responses
export function handleSupabaseSuccess(data?: any) {
  return {
    success: true,
    data,
  }
}
