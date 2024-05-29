var sum_to_n_a = function(n) {
    let count = 0
    for (i=0;i<n;i++){
        count += i;
    }
    return count;
};

var sum_to_n_b = function(n) {
    // recursive approach
    if(n==1){
        return 1;
    }
    else{
        return n + sum_to_n_b(n-1);
    }
};

var sum_to_n_c = function(n) {
    // summation
    return ((n*(n+1))/2)
};