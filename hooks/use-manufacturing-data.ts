"use client"

import { useState, useEffect } from "react"
import { supabase, handleSupabaseError, handleSupabaseSuccess } from "@/lib/supabase"
import type {
  FiveSAudit,
  ProductionData,
  QualityInspection,
  ResourceConsumption,
  KaizenIdea,
  Plant,
  ProductionLine,
  Product,
  Employee,
  SafetyEvent,
  EnvironmentalData,
  EmployeeFeedback,
  TrainingRecord,
} from "@/lib/supabase"

// Master data hook
export function useManufacturingData() {
  const [plants, setPlants] = useState<Plant[]>([])
  const [productionLines, setProductionLines] = useState<ProductionLine[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchMasterData()
  }, [])

  const fetchMasterData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Check if we're in demo mode (no Supabase env vars)
      const isDemoMode = !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (isDemoMode) {
        // Provide demo data
        const demoPlants: Plant[] = [
          {
            id: "demo-plant-1",
            name: "Manufacturing Plant A",
            location: "Detroit, MI",
            timezone: "America/Detroit",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: "demo-plant-2",
            name: "Manufacturing Plant B",
            location: "Austin, TX",
            timezone: "America/Chicago",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ]

        const demoLines: ProductionLine[] = [
          {
            id: "demo-line-1",
            plant_id: "demo-plant-1",
            name: "Line A",
            capacity_per_hour: 100,
            status: "active",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: "demo-line-2",
            plant_id: "demo-plant-1",
            name: "Line B",
            capacity_per_hour: 120,
            status: "active",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ]

        const demoProducts: Product[] = [
          {
            id: "demo-product-1",
            sku: "SKU001",
            name: "Product A",
            category: "Electronics",
            unit_price: 25.5,
            target_yield: 95.0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: "demo-product-2",
            sku: "SKU002",
            name: "Product B",
            category: "Electronics",
            unit_price: 32.75,
            target_yield: 93.0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ]

        const demoEmployees: Employee[] = [
          {
            id: "demo-emp-1",
            employee_id: "EMP001",
            name: "John Smith",
            role: "Operator",
            shift: "Shift 1",
            plant_id: "demo-plant-1",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: "demo-emp-2",
            employee_id: "EMP002",
            name: "Mary Johnson",
            role: "Quality Inspector",
            shift: "Shift 1",
            plant_id: "demo-plant-1",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ]

        setPlants(demoPlants)
        setProductionLines(demoLines)
        setProducts(demoProducts)
        setEmployees(demoEmployees)
        return
      }

      // Original Supabase logic
      const [plantsResult, linesResult, productsResult, employeesResult] = await Promise.all([
        supabase.from("plants").select("*").order("name"),
        supabase.from("production_lines").select("*").order("name"),
        supabase.from("products").select("*").order("name"),
        supabase.from("employees").select("*").order("name"),
      ])

      if (plantsResult.error) throw plantsResult.error
      if (linesResult.error) throw linesResult.error
      if (productsResult.error) throw productsResult.error
      if (employeesResult.error) throw employeesResult.error

      setPlants(plantsResult.data || [])
      setProductionLines(linesResult.data || [])
      setProducts(productsResult.data || [])
      setEmployees(employeesResult.data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return {
    plants,
    productionLines,
    products,
    employees,
    loading,
    error,
    refetch: fetchMasterData,
  }
}

// 5S Data hook
export function useFiveSData(plantId?: string, lineId?: string) {
  const [data, setData] = useState<FiveSAudit[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchFiveSData()
  }, [plantId, lineId])

  const fetchFiveSData = async () => {
    try {
      setLoading(true)
      setError(null)

      const isDemoMode = !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (isDemoMode) {
        // Provide demo 5S data
        const demoFiveSData: FiveSAudit[] = [
          {
            id: "demo-5s-1",
            plant_id: plantId || "demo-plant-1",
            line_id: lineId || "demo-line-1",
            audit_date: new Date().toISOString().split("T")[0],
            auditor_id: "demo-emp-2",
            sort_score: 85,
            set_in_order_score: 78,
            shine_score: 92,
            standardize_score: 88,
            sustain_score: 75,
            overall_score: 83.6,
            comments: "Good progress on shine, need to improve sustain practices",
            photos: null,
            created_at: new Date().toISOString(),
            auditor: { name: "Mary Johnson" } as Employee,
            line: { name: "Line A" } as ProductionLine,
          },
          {
            id: "demo-5s-2",
            plant_id: plantId || "demo-plant-1",
            line_id: lineId || "demo-line-1",
            audit_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
            auditor_id: "demo-emp-2",
            sort_score: 82,
            set_in_order_score: 75,
            shine_score: 89,
            standardize_score: 85,
            sustain_score: 72,
            overall_score: 80.6,
            comments: "Consistent improvement needed in set in order",
            photos: null,
            created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            auditor: { name: "Mary Johnson" } as Employee,
            line: { name: "Line A" } as ProductionLine,
          },
        ]

        setData(demoFiveSData)
        return
      }

      // Original Supabase logic continues...
      let query = supabase
        .from("five_s_audits")
        .select(`
        *,
        auditor:employees(name),
        line:production_lines(name)
      `)
        .order("audit_date", { ascending: false })

      if (plantId) query = query.eq("plant_id", plantId)
      if (lineId) query = query.eq("line_id", lineId)

      const { data: result, error } = await query.limit(50)

      if (error) throw error
      setData(result || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const submitAudit = async (auditData: Omit<FiveSAudit, "id" | "overall_score" | "created_at">) => {
    try {
      const { error } = await supabase.from("five_s_audits").insert([auditData])

      if (error) throw error
      await fetchFiveSData()
      return handleSupabaseSuccess()
    } catch (err) {
      return handleSupabaseError(err)
    }
  }

  return {
    data,
    loading,
    error,
    refetch: fetchFiveSData,
    submitAudit,
  }
}

// Production Data hook
export function useProductionData(plantId?: string, lineId?: string, dateRange?: { from: string; to: string }) {
  const [data, setData] = useState<ProductionData[]>([])
  const [oeeData, setOeeData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProductionData()
  }, [plantId, lineId, dateRange])

  const fetchProductionData = async () => {
    try {
      setLoading(true)
      setError(null)

      let query = supabase
        .from("production_data")
        .select(`
          *,
          product:products(name, sku),
          operator:employees(name),
          line:production_lines(name)
        `)
        .order("production_date", { ascending: false })
        .order("hour_of_day", { ascending: false })

      if (plantId) query = query.eq("plant_id", plantId)
      if (lineId) query = query.eq("line_id", lineId)
      if (dateRange) {
        query = query.gte("production_date", dateRange.from).lte("production_date", dateRange.to)
      }

      const { data: result, error } = await query.limit(100)

      if (error) throw error
      setData(result || [])

      // Calculate OEE data
      const oeeCalculations = calculateOEE(result || [])
      setOeeData(oeeCalculations)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const calculateOEE = (productionData: ProductionData[]) => {
    const shiftData = productionData.reduce((acc, record) => {
      const key = `${record.shift}-${record.production_date}`
      if (!acc[key]) {
        acc[key] = {
          shift: record.shift,
          date: record.production_date,
          totalPlanned: 0,
          totalActual: 0,
          totalGood: 0,
          totalDowntime: 0,
          records: [],
        }
      }
      acc[key].totalPlanned += record.planned_production || 0
      acc[key].totalActual += record.actual_production || 0
      acc[key].totalGood += record.good_units || 0
      acc[key].totalDowntime += record.downtime_minutes || 0
      acc[key].records.push(record)
      return acc
    }, {} as any)

    return Object.values(shiftData).map((shift: any) => {
      const availability = shift.totalDowntime > 0 ? ((480 - shift.totalDowntime) / 480) * 100 : 100
      const performance = shift.totalPlanned > 0 ? (shift.totalActual / shift.totalPlanned) * 100 : 0
      const quality = shift.totalActual > 0 ? (shift.totalGood / shift.totalActual) * 100 : 0
      const oee = (availability * performance * quality) / 10000

      return {
        shift: shift.shift,
        date: shift.date,
        availability: Math.round(availability * 100) / 100,
        performance: Math.round(performance * 100) / 100,
        quality: Math.round(quality * 100) / 100,
        oee: Math.round(oee * 100) / 100,
      }
    })
  }

  const submitData = async (productionData: Omit<ProductionData, "id" | "created_at">) => {
    try {
      const { error } = await supabase.from("production_data").insert([productionData])

      if (error) throw error
      await fetchProductionData()
      return handleSupabaseSuccess()
    } catch (err) {
      return handleSupabaseError(err)
    }
  }

  return {
    data,
    oeeData,
    loading,
    error,
    refetch: fetchProductionData,
    submitData,
  }
}

// Quality Data hook
export function useQualityData(plantId?: string, lineId?: string) {
  const [data, setData] = useState<QualityInspection[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchQualityData()
  }, [plantId, lineId])

  const fetchQualityData = async () => {
    try {
      setLoading(true)
      setError(null)

      let query = supabase
        .from("quality_inspections")
        .select(`
          *,
          product:products(name, sku, target_yield),
          inspector:employees(name),
          line:production_lines(name)
        `)
        .order("inspection_date", { ascending: false })

      if (plantId) query = query.eq("plant_id", plantId)
      if (lineId) query = query.eq("line_id", lineId)

      const { data: result, error } = await query.limit(100)

      if (error) throw error
      setData(result || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const submitInspection = async (inspectionData: Omit<QualityInspection, "id" | "yield_percent" | "created_at">) => {
    try {
      const { error } = await supabase.from("quality_inspections").insert([inspectionData])

      if (error) throw error
      await fetchQualityData()
      return handleSupabaseSuccess()
    } catch (err) {
      return handleSupabaseError(err)
    }
  }

  return {
    data,
    loading,
    error,
    refetch: fetchQualityData,
    submitInspection,
  }
}

// Resource Data hook
export function useResourceData(plantId?: string, lineId?: string) {
  const [data, setData] = useState<ResourceConsumption[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchResourceData()
  }, [plantId, lineId])

  const fetchResourceData = async () => {
    try {
      setLoading(true)
      setError(null)

      let query = supabase
        .from("resource_consumption")
        .select(`
          *,
          line:production_lines(name)
        `)
        .order("consumption_date", { ascending: false })

      if (plantId) query = query.eq("plant_id", plantId)
      if (lineId) query = query.eq("line_id", lineId)

      const { data: result, error } = await query.limit(100)

      if (error) throw error
      setData(result || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const submitData = async (resourceData: Omit<ResourceConsumption, "id" | "total_cost" | "created_at">) => {
    try {
      const { error } = await supabase.from("resource_consumption").insert([resourceData])

      if (error) throw error
      await fetchResourceData()
      return handleSupabaseSuccess()
    } catch (err) {
      return handleSupabaseError(err)
    }
  }

  return {
    data,
    loading,
    error,
    refetch: fetchResourceData,
    submitData,
  }
}

// Kaizen Data hook
export function useKaizenData(plantId?: string, lineId?: string) {
  const [data, setData] = useState<KaizenIdea[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchKaizenData()
  }, [plantId, lineId])

  const fetchKaizenData = async () => {
    try {
      setLoading(true)
      setError(null)

      let query = supabase
        .from("kaizen_ideas")
        .select(`
          *,
          submitter:employees(name),
          line:production_lines(name)
        `)
        .order("created_at", { ascending: false })

      if (plantId) query = query.eq("plant_id", plantId)
      if (lineId) query = query.eq("line_id", lineId)

      const { data: result, error } = await query.limit(100)

      if (error) throw error
      setData(result || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const submitIdea = async (kaizenData: Omit<KaizenIdea, "id" | "created_at" | "updated_at">) => {
    try {
      const { error } = await supabase.from("kaizen_ideas").insert([kaizenData])

      if (error) throw error
      await fetchKaizenData()
      return handleSupabaseSuccess()
    } catch (err) {
      return handleSupabaseError(err)
    }
  }

  return {
    data,
    loading,
    error,
    refetch: fetchKaizenData,
    submitIdea,
  }
}

// Safety Data hook
export function useSafetyData(plantId?: string, lineId?: string) {
  const [data, setData] = useState<SafetyEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchSafetyData()
  }, [plantId, lineId])

  const fetchSafetyData = async () => {
    try {
      setLoading(true)
      setError(null)

      let query = supabase
        .from("safety_events")
        .select(`
          *,
          reporter:employees!safety_events_reported_by_fkey(name),
          injured_person:employees!safety_events_injured_person_id_fkey(name),
          line:production_lines(name)
        `)
        .order("event_date", { ascending: false })

      if (plantId) query = query.eq("plant_id", plantId)
      if (lineId) query = query.eq("line_id", lineId)

      const { data: result, error } = await query.limit(100)

      if (error) throw error
      setData(result || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const submitEvent = async (safetyData: Omit<SafetyEvent, "id" | "created_at" | "updated_at">) => {
    try {
      const { error } = await supabase.from("safety_events").insert([safetyData])

      if (error) throw error
      await fetchSafetyData()
      return handleSupabaseSuccess()
    } catch (err) {
      return handleSupabaseError(err)
    }
  }

  return {
    data,
    loading,
    error,
    refetch: fetchSafetyData,
    submitEvent,
  }
}

// Environmental Data hook
export function useEnvironmentalData(plantId?: string) {
  const [data, setData] = useState<EnvironmentalData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchEnvironmentalData()
  }, [plantId])

  const fetchEnvironmentalData = async () => {
    try {
      setLoading(true)
      setError(null)

      let query = supabase.from("environmental_data").select("*").order("measurement_date", { ascending: false })

      if (plantId) query = query.eq("plant_id", plantId)

      const { data: result, error } = await query.limit(100)

      if (error) throw error
      setData(result || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const submitData = async (environmentalData: Omit<EnvironmentalData, "id" | "created_at">) => {
    try {
      const { error } = await supabase.from("environmental_data").insert([environmentalData])

      if (error) throw error
      await fetchEnvironmentalData()
      return handleSupabaseSuccess()
    } catch (err) {
      return handleSupabaseError(err)
    }
  }

  return {
    data,
    loading,
    error,
    refetch: fetchEnvironmentalData,
    submitData,
  }
}

// Employee Feedback hook
export function useEmployeeFeedback(plantId?: string) {
  const [data, setData] = useState<EmployeeFeedback[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchFeedbackData()
  }, [plantId])

  const fetchFeedbackData = async () => {
    try {
      setLoading(true)
      setError(null)

      let query = supabase
        .from("employee_feedback")
        .select(`
          *,
          employee:employees(name, role, plant_id)
        `)
        .order("feedback_date", { ascending: false })

      if (plantId) {
        query = query.eq("employee.plant_id", plantId)
      }

      const { data: result, error } = await query.limit(100)

      if (error) throw error
      setData(result || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const submitFeedback = async (feedbackData: Omit<EmployeeFeedback, "id" | "created_at">) => {
    try {
      const { error } = await supabase.from("employee_feedback").insert([feedbackData])

      if (error) throw error
      await fetchFeedbackData()
      return handleSupabaseSuccess()
    } catch (err) {
      return handleSupabaseError(err)
    }
  }

  return {
    data,
    loading,
    error,
    refetch: fetchFeedbackData,
    submitFeedback,
  }
}

// Training Records hook
export function useTrainingData(plantId?: string) {
  const [data, setData] = useState<TrainingRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTrainingData()
  }, [plantId])

  const fetchTrainingData = async () => {
    try {
      setLoading(true)
      setError(null)

      let query = supabase
        .from("training_records")
        .select(`
          *,
          employee:employees(name, role, plant_id)
        `)
        .order("completion_date", { ascending: false })

      if (plantId) {
        query = query.eq("employee.plant_id", plantId)
      }

      const { data: result, error } = await query.limit(100)

      if (error) throw error
      setData(result || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const submitTraining = async (trainingData: Omit<TrainingRecord, "id" | "created_at">) => {
    try {
      const { error } = await supabase.from("training_records").insert([trainingData])

      if (error) throw error
      await fetchTrainingData()
      return handleSupabaseSuccess()
    } catch (err) {
      return handleSupabaseError(err)
    }
  }

  return {
    data,
    loading,
    error,
    refetch: fetchTrainingData,
    submitTraining,
  }
}
