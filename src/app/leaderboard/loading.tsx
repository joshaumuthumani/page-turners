import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="container mx-auto py-8 px-4 animate-pulse">
      <div className="text-center mb-8">
        <Skeleton className="h-12 w-1/2 mx-auto mb-4" />
        <Skeleton className="h-6 w-1/3 mx-auto" />
      </div>

      <Card className="mb-8">
        <CardHeader className="text-center">
          <Skeleton className="h-8 w-1/4 mx-auto" />
        </CardHeader>
      </Card>
      
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-6 w-1/2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-6 w-1/2" />
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
            <Skeleton className="h-8 w-1/3" />
        </CardHeader>
        <CardContent>
            <Skeleton className="h-80 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}
