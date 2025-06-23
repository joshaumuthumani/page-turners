import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Loading() {
  return (
    <div className="container mx-auto py-8 px-4 animate-pulse">
      <Skeleton className="h-12 w-1/3 mx-auto mb-8" />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader><Skeleton className="h-8 w-1/2" /></CardHeader>
            <CardContent><Skeleton className="h-24 w-full" /></CardContent>
          </Card>
          <Card>
            <CardHeader><Skeleton className="h-8 w-1/3" /></CardHeader>
            <CardContent><Skeleton className="h-40 w-full" /></CardContent>
          </Card>
          <Card>
            <CardHeader><Skeleton className="h-8 w-2/3" /></CardHeader>
            <CardContent><Skeleton className="h-48 w-full" /></CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardHeader><Skeleton className="h-8 w-3/4" /></CardHeader>
            <CardContent className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-16 w-12" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
