-- Seed data for manufacturing platform

-- Insert sample plants
INSERT INTO public.plants (id, name, location, timezone) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Manufacturing Plant A', 'Detroit, MI', 'America/Detroit'),
('550e8400-e29b-41d4-a716-446655440002', 'Manufacturing Plant B', 'Austin, TX', 'America/Chicago'),
('550e8400-e29b-41d4-a716-446655440003', 'Manufacturing Plant C', 'Phoenix, AZ', 'America/Phoenix')
ON CONFLICT (id) DO NOTHING;

-- Insert production lines
INSERT INTO public.production_lines (id, plant_id, name, capacity_per_hour, status) VALUES
('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Line A', 100, 'active'),
('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'Line B', 120, 'active'),
('660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440002', 'Line C', 150, 'active'),
('660e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440002', 'Line D', 130, 'active'),
('660e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440003', 'Line E', 110, 'active')
ON CONFLICT (id) DO NOTHING;

-- Insert products
INSERT INTO public.products (id, sku, name, category, unit_price, target_yield) VALUES
('770e8400-e29b-41d4-a716-446655440001', 'SKU001', 'Product A', 'Electronics', 25.50, 95.0),
('770e8400-e29b-41d4-a716-446655440002', 'SKU002', 'Product B', 'Electronics', 32.75, 93.0),
('770e8400-e29b-41d4-a716-446655440003', 'SKU003', 'Product C', 'Automotive', 45.20, 96.0),
('770e8400-e29b-41d4-a716-446655440004', 'SKU004', 'Product D', 'Automotive', 28.90, 92.0),
('770e8400-e29b-41d4-a716-446655440005', 'SKU005', 'Product E', 'Consumer Goods', 18.75, 94.5)
ON CONFLICT (sku) DO NOTHING;

-- Insert employees
INSERT INTO public.employees (id, employee_id, name, role, shift, plant_id) VALUES
('880e8400-e29b-41d4-a716-446655440001', 'EMP001', 'John Smith', 'Operator', 'Shift 1', '550e8400-e29b-41d4-a716-446655440001'),
('880e8400-e29b-41d4-a716-446655440002', 'EMP002', 'Mary Johnson', 'Quality Inspector', 'Shift 1', '550e8400-e29b-41d4-a716-446655440001'),
('880e8400-e29b-41d4-a716-446655440003', 'EMP003', 'David Wilson', 'Supervisor', 'Shift 1', '550e8400-e29b-41d4-a716-446655440001'),
('880e8400-e29b-41d4-a716-446655440004', 'EMP004', 'Sarah Davis', 'Maintenance Tech', 'Shift 2', '550e8400-e29b-41d4-a716-446655440001'),
('880e8400-e29b-41d4-a716-446655440005', 'EMP005', 'Mike Brown', 'Operator', 'Shift 2', '550e8400-e29b-41d4-a716-446655440002'),
('880e8400-e29b-41d4-a716-446655440006', 'EMP006', 'Lisa Garcia', 'Quality Inspector', 'Shift 2', '550e8400-e29b-41d4-a716-446655440002'),
('880e8400-e29b-41d4-a716-446655440007', 'EMP007', 'Robert Lee', 'Plant Manager', 'Day', '550e8400-e29b-41d4-a716-446655440001'),
('880e8400-e29b-41d4-a716-446655440008', 'EMP008', 'Jennifer White', 'Safety Officer', 'Day', '550e8400-e29b-41d4-a716-446655440002')
ON CONFLICT (employee_id) DO NOTHING;

-- Insert sample 5S audit data
INSERT INTO public.five_s_audits (plant_id, line_id, audit_date, auditor_id, sort_score, set_in_order_score, shine_score, standardize_score, sustain_score, comments) VALUES
('550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', CURRENT_DATE - INTERVAL '1 days', '880e8400-e29b-41d4-a716-446655440003', 85, 78, 92, 88, 75, 'Good progress on shine, need to improve sustain practices'),
('550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', CURRENT_DATE - INTERVAL '8 days', '880e8400-e29b-41d4-a716-446655440003', 82, 75, 89, 85, 72, 'Consistent improvement needed in set in order'),
('550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', CURRENT_DATE - INTERVAL '15 days', '880e8400-e29b-41d4-a716-446655440003', 80, 73, 87, 83, 70, 'Focus on standardization processes'),
('550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440002', CURRENT_DATE - INTERVAL '2 days', '880e8400-e29b-41d4-a716-446655440003', 88, 82, 90, 85, 78, 'Line B showing good improvement'),
('550e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440003', CURRENT_DATE - INTERVAL '3 days', '880e8400-e29b-41d4-a716-446655440006', 90, 85, 88, 92, 80, 'Excellent standardization on Line C');

-- Insert sample production data
INSERT INTO public.production_data (plant_id, line_id, product_id, shift, production_date, hour_of_day, planned_production, actual_production, good_units, rejected_units, downtime_minutes, downtime_reason, operator_id) VALUES
('550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440001', 'Shift 1', CURRENT_DATE, 1, 100, 95, 90, 5, 15, 'Material shortage', '880e8400-e29b-41d4-a716-446655440001'),
('550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440001', 'Shift 1', CURRENT_DATE, 2, 100, 98, 94, 4, 8, 'Equipment adjustment', '880e8400-e29b-41d4-a716-446655440001'),
('550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440001', 'Shift 1', CURRENT_DATE, 3, 100, 102, 98, 4, 0, NULL, '880e8400-e29b-41d4-a716-446655440001'),
('550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440002', 'Shift 1', CURRENT_DATE, 4, 120, 115, 110, 5, 12, 'Quality check', '880e8400-e29b-41d4-a716-446655440001'),
('550e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440003', '770e8400-e29b-41d4-a716-446655440003', 'Shift 1', CURRENT_DATE, 1, 150, 145, 140, 5, 10, 'Changeover', '880e8400-e29b-41d4-a716-446655440005'),
('550e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440003', '770e8400-e29b-41d4-a716-446655440003', 'Shift 1', CURRENT_DATE, 2, 150, 148, 145, 3, 5, 'Minor adjustment', '880e8400-e29b-41d4-a716-446655440005');

-- Insert sample quality inspection data
INSERT INTO public.quality_inspections (plant_id, line_id, product_id, batch_number, inspection_date, inspector_id, inspected_quantity, passed_quantity, failed_quantity, defect_category, comments) VALUES
('550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440001', 'BATCH001', CURRENT_DATE, '880e8400-e29b-41d4-a716-446655440002', 100, 94, 6, 'Dimensional', 'Minor dimensional variations detected'),
('550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440002', 'BATCH002', CURRENT_DATE, '880e8400-e29b-41d4-a716-446655440002', 120, 110, 10, 'Surface Finish', 'Surface finish issues on 10 units'),
('550e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440003', '770e8400-e29b-41d4-a716-446655440003', 'BATCH003', CURRENT_DATE, '880e8400-e29b-41d4-a716-446655440006', 150, 145, 5, 'Material', 'Material defects found in 5 units'),
('550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440004', 'BATCH004', CURRENT_DATE - INTERVAL '1 days', '880e8400-e29b-41d4-a716-446655440002', 130, 125, 5, 'Assembly', 'Assembly issues identified');

-- Insert sample resource consumption data
INSERT INTO public.resource_consumption (plant_id, line_id, consumption_date, shift, labor_hours, labor_cost, power_kwh, power_cost, fuel_liters, fuel_cost, maintenance_cost) VALUES
('550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', CURRENT_DATE, 'Shift 1', 24.0, 1200.00, 450.5, 67.58, 25.3, 63.25, 150.00),
('550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', CURRENT_DATE - INTERVAL '1 day', 'Shift 1', 24.0, 1200.00, 465.2, 69.78, 27.1, 67.75, 200.00),
('550e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440003', CURRENT_DATE, 'Shift 1', 32.0, 1600.00, 580.3, 87.05, 35.2, 88.00, 175.00),
('550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440002', CURRENT_DATE, 'Shift 2', 24.0, 1320.00, 420.8, 63.12, 22.5, 56.25, 125.00);

-- Insert sample Kaizen ideas
INSERT INTO public.kaizen_ideas (title, description, category, priority, current_state, proposed_solution, expected_benefit, estimated_savings, submitter_id, plant_id, line_id, status, actual_savings) VALUES
('Reduce Changeover Time', 'Current changeover takes 45 minutes, causing production delays', 'productivity', 'high', 'Manual changeover process with multiple adjustments', 'Implement quick-change tooling and standardized setup procedures', 'Reduce changeover time to 20 minutes', 15000.00, '880e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', 'implemented', 12000.00),
('Improve Material Flow', 'Material handling creates bottlenecks in production', 'productivity', 'medium', 'Manual material transport between stations', 'Install conveyor system for automated material flow', 'Increase throughput by 15%', 25000.00, '880e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', 'approved', 0),
('Energy Efficiency Improvement', 'High energy consumption during off-peak hours', 'cost', 'medium', 'Equipment runs continuously even during breaks', 'Implement automated shutdown during breaks', 'Reduce energy costs by 20%', 8000.00, '880e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440003', 'submitted', 0),
('Safety Barrier Installation', 'Potential safety hazard near moving equipment', 'safety', 'high', 'Open access to moving machinery', 'Install safety barriers and warning systems', 'Eliminate safety risks', 5000.00, '880e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440003', 'approved', 0);

-- Insert sample safety events
INSERT INTO public.safety_events (plant_id, line_id, event_date, event_type, severity, description, reported_by, immediate_action, status) VALUES
('550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', CURRENT_DATE - INTERVAL '2 days', 'near_miss', 'medium', 'Operator almost slipped on wet floor near workstation', '880e8400-e29b-41d4-a716-446655440001', 'Area cleaned and warning signs posted', 'closed'),
('550e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440003', CURRENT_DATE - INTERVAL '5 days', 'ppe_violation', 'low', 'Worker observed without safety glasses in designated area', '880e8400-e29b-41d4-a716-446655440008', 'Worker reminded of PPE requirements', 'closed'),
('550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440002', CURRENT_DATE - INTERVAL '1 days', 'near_miss', 'high', 'Equipment guard was loose and could have caused injury', '880e8400-e29b-41d4-a716-446655440003', 'Equipment shut down and guard secured', 'open');

-- Insert sample environmental data
INSERT INTO public.environmental_data (plant_id, measurement_date, scope1_emissions_kg, scope2_emissions_kg, water_consumption_liters, waste_generated_kg, waste_recycled_kg, energy_consumption_kwh, renewable_energy_kwh) VALUES
('550e8400-e29b-41d4-a716-446655440001', CURRENT_DATE, 1250.5, 2100.3, 15000.0, 850.2, 680.1, 12500.0, 2500.0),
('550e8400-e29b-41d4-a716-446655440002', CURRENT_DATE, 1580.2, 2650.8, 18500.0, 1020.5, 816.4, 15200.0, 3040.0),
('550e8400-e29b-41d4-a716-446655440001', CURRENT_DATE - INTERVAL '1 day', 1180.3, 1950.7, 14200.0, 780.3, 624.2, 11800.0, 2360.0),
('550e8400-e29b-41d4-a716-446655440002', CURRENT_DATE - INTERVAL '1 day', 1620.8, 2720.4, 19200.0, 1150.6, 920.5, 15800.0, 3160.0);

-- Insert sample employee feedback
INSERT INTO public.employee_feedback (employee_id, feedback_date, morale_rating, satisfaction_rating, feedback_text, suggestions) VALUES
('880e8400-e29b-41d4-a716-446655440001', CURRENT_DATE - INTERVAL '7 days', 4, 4, 'Good working environment, appreciate the safety focus', 'More training opportunities would be helpful'),
('880e8400-e29b-41d4-a716-446655440002', CURRENT_DATE - INTERVAL '5 days', 5, 4, 'Excellent team collaboration and management support', 'Consider flexible working hours'),
('880e8400-e29b-41d4-a716-446655440005', CURRENT_DATE - INTERVAL '3 days', 3, 3, 'Work is challenging but rewarding', 'Better communication between shifts needed'),
('880e8400-e29b-41d4-a716-446655440006', CURRENT_DATE - INTERVAL '1 days', 4, 5, 'Very satisfied with current role and responsibilities', 'More cross-training opportunities');

-- Insert sample training records
INSERT INTO public.training_records (employee_id, training_name, training_category, completion_date, expiry_date, score, trainer, certification_number) VALUES
('880e8400-e29b-41d4-a716-446655440001', 'Safety Fundamentals', 'Safety', CURRENT_DATE - INTERVAL '30 days', CURRENT_DATE + INTERVAL '365 days', 95, 'Safety Instructor A', 'CERT-001-2024'),
('880e8400-e29b-41d4-a716-446655440002', 'Quality Control Procedures', 'Quality', CURRENT_DATE - INTERVAL '45 days', CURRENT_DATE + INTERVAL '730 days', 88, 'Quality Manager', 'CERT-002-2024'),
('880e8400-e29b-41d4-a716-446655440003', 'Leadership Development', 'Management', CURRENT_DATE - INTERVAL '60 days', NULL, 92, 'External Trainer', 'CERT-003-2024'),
('880e8400-e29b-41d4-a716-446655440004', 'Maintenance Best Practices', 'Technical', CURRENT_DATE - INTERVAL '20 days', CURRENT_DATE + INTERVAL '365 days', 90, 'Senior Technician', 'CERT-004-2024');
