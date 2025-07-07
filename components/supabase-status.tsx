"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface ConnectionStatus {
  connected: boolean
  motorcyclesTable: boolean
  error?: string
}

export default function SupabaseStatus() {
  const [status, setStatus] = useState<ConnectionStatus | null>(null)
  const [loading, setLoading] = useState(false)

  const checkConnection = async () => {
    setLoading(true)
    try {
      // Test basic connection
      const { error: profileError } = await supabase
        .from('profiles')
        .select('count')
        .limit(1)

      if (profileError) {
        setStatus({
          connected: false,
          motorcyclesTable: false,
          error: profileError.message
        })
        return
      }

      // Test motorcycles table
      const { error: motorcyclesError } = await supabase
        .from('motorcycles')
        .select('count')
        .limit(1)

      setStatus({
        connected: true,
        motorcyclesTable: !motorcyclesError,
        error: motorcyclesError?.message
      })
    } catch (error) {
      setStatus({
        connected: false,
        motorcyclesTable: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkConnection()
  }, [])

  if (!status) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            Checking Supabase Connection...
          </CardTitle>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {status.connected ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <XCircle className="h-5 w-5 text-red-500" />
          )}
          Supabase Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span>Connection</span>
            <Badge variant={status.connected ? "default" : "destructive"}>
              {status.connected ? "Connected" : "Failed"}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span>Motorcycles Table</span>
            <Badge variant={status.motorcyclesTable ? "default" : "destructive"}>
              {status.motorcyclesTable ? "Ready" : "Missing"}
            </Badge>
          </div>
        </div>

        {status.error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-destructive">Error</p>
                <p className="text-destructive/80">{status.error}</p>
              </div>
            </div>
          </div>
        )}

        {!status.connected && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 dark:bg-yellow-950 dark:border-yellow-800">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0 dark:text-yellow-400" />
              <div className="text-sm">
                <p className="font-medium text-yellow-800 dark:text-yellow-200">Setup Required</p>
                <p className="text-yellow-700 dark:text-yellow-300">
                  Please check your environment variables and database schema.
                </p>
              </div>
            </div>
          </div>
        )}

        {!status.motorcyclesTable && status.connected && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 dark:bg-blue-950 dark:border-blue-800">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0 dark:text-blue-400" />
              <div className="text-sm">
                <p className="font-medium text-blue-800 dark:text-blue-200">Database Schema</p>
                <p className="text-blue-700 dark:text-blue-300">
                  Run the SQL commands from database-schema.sql in your Supabase dashboard.
                </p>
              </div>
            </div>
          </div>
        )}

        <Button onClick={checkConnection} disabled={loading} className="w-full">
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Checking...
            </>
          ) : (
            "Check Again"
          )}
        </Button>
      </CardContent>
    </Card>
  )
} 