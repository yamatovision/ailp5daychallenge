-- AB Test Events テーブル
CREATE TABLE ab_test_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  component_id TEXT NOT NULL,
  variant TEXT NOT NULL,
  event_type TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  session_id TEXT NOT NULL,
  source_id TEXT,
  data JSONB,
  
  CONSTRAINT valid_variant CHECK (variant IN ('a', 'b')),
  CONSTRAINT valid_event_type CHECK (event_type IN ('view', 'scroll', 'click', 'conversion', 'exit'))
);

-- インデックス作成
CREATE INDEX idx_ab_component_variant ON ab_test_events(component_id, variant);
CREATE INDEX idx_ab_timestamp ON ab_test_events(timestamp);
CREATE INDEX idx_ab_session_id ON ab_test_events(session_id);

-- コンポーネントメトリクスビュー
CREATE OR REPLACE VIEW component_metrics AS
SELECT 
  component_id,
  variant,
  COUNT(DISTINCT session_id) AS unique_visitors,
  COUNT(CASE WHEN event_type = 'conversion' THEN 1 END) AS conversions,
  ROUND(
    CASE WHEN COUNT(DISTINCT session_id) > 0 THEN
      COUNT(CASE WHEN event_type = 'conversion' THEN 1 END)::NUMERIC / COUNT(DISTINCT session_id) * 100
    ELSE 0 END,
    2
  ) AS conversion_rate
FROM ab_test_events
GROUP BY component_id, variant;

-- RLS ポリシー（オプション、今回は簡略化のため省略）